import { IEmailJob, IVerifyEmailJob } from "@/common/interfaces/job.interface";
import { Branded } from "@/common/types/types";
import { AllConfigType } from "@/config/config.type";
import { Entity } from "@/constants/entity.enum";
import { ErrorCode } from "@/constants/error-code.constant";
import { JobName, QueueName } from "@/constants/job.constant";
import { ValidationException } from "@/exceptions/validation.exception";
import { verifyPassword } from "@/utils/password.util";
import { InjectQueue } from "@nestjs/bullmq";
// import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Queue } from "bullmq";
import { plainToInstance } from "class-transformer";
import crypto from "crypto";
import { Model } from "mongoose";
import ms from "ms";
import { SessionDocument } from "../user/entities/session.entity";
import { UserRepository } from "../user/user.repository";
import { LoginReqDto } from "./dto/login.req.dto";
import { LoginResDto } from "./dto/login.res.dto";
import { RefreshReqDto } from "./dto/refresh.req.dto";
import { RefreshResDto } from "./dto/refresh.res.dto";
import { RegisterReqDto } from "./dto/register.req.dto";
import { RegisterResDto } from "./dto/register.res.dto";
import { JwtPayloadType } from "./types/jwt-payload.type";
import { JwtRefreshPayloadType } from "./types/jwt-refresh-payload.type";

type Token = Branded<
  {
    accessToken: string;
    refreshToken: string;
    tokenExpires: number;
  },
  "token"
>;

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly jwtService: JwtService,
    @InjectModel(Entity.SESSION) public readonly sessionModel: Model<SessionDocument>,
    private readonly userRepository: UserRepository,
    @InjectQueue(QueueName.EMAIL)
    private readonly emailQueue: Queue<IEmailJob, any, string>,
    // @Inject(CACHE_MANAGER)
    // private readonly cacheManager: Cache,
  ) {}

  /**
   * Sign in user
   * @param dto LoginReqDto
   * @returns LoginResDto
   */
  async signIn(dto: LoginReqDto): Promise<LoginResDto> {
    const { email, password } = dto;
    const user = await this.userRepository.findByEmail(email, { select: ["+password"] });

    const isPasswordValid = user && (await verifyPassword(password, user.password));

    if (!isPasswordValid) {
      throw new UnauthorizedException({
        message: "INVALID_CREDENTIALS",
      });
    }

    const hash = crypto.createHash("sha256").update(randomStringGenerator()).digest("hex");

    const session = new this.sessionModel({
      hash,
      userId: user.id,
    });
    await session.save();

    const token = await this.createToken({
      id: user.id,
      sessionId: session.id,
      hash,
      role: user.role,
    });

    return plainToInstance(LoginResDto, {
      userId: user.id,
      ...token,
    });
  }

  async register(dto: RegisterReqDto): Promise<RegisterResDto> {
    // Check if the user already exists
    const isExistUser = await this.userRepository.findByEmail(dto.email);

    if (isExistUser) {
      throw new ValidationException(ErrorCode.U003);
    }

    // Register user
    const user = await this.userRepository.createUser({
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });

    // Send email verification
    const token = await this.createVerificationToken({ id: user.id });
    // const tokenExpiresIn = this.configService.getOrThrow("auth.confirmEmailExpires", {
    //   infer: true,
    // });
    // await this.cacheManager.set(
    //   createCacheKey(CacheKey.EMAIL_VERIFICATION, user.id),
    //   token,
    //   ms(tokenExpiresIn),
    // );

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.emailQueue.add(
      JobName.EMAIL_VERIFICATION,
      {
        email: dto.email,
        token,
      } as IVerifyEmailJob,
      { attempts: 3, backoff: { type: "exponential", delay: 60000 } },
    );

    return plainToInstance(RegisterResDto, {
      userId: user.id,
    });
  }

  async logout(userToken: JwtPayloadType): Promise<void> {
    // await this.cacheManager.set(
    //   createCacheKey(CacheKey.SESSION_BLACKLIST, userToken.sessionId),
    //   true,
    //   userToken.exp * 1000 - Date.now(),
    // );
    await this.sessionModel.deleteOne({ _id: userToken.sessionId });
  }

  async refreshToken(dto: RefreshReqDto): Promise<RefreshResDto> {
    const { sessionId, hash } = this.verifyRefreshToken(dto.refreshToken);
    const session = await this.sessionModel.findOne({ _id: sessionId });

    if (!session || session.hash !== hash) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findById(session.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const newHash = crypto.createHash("sha256").update(randomStringGenerator()).digest("hex");

    await this.sessionModel.updateOne({ _id: session.id }, { hash: newHash });

    return await this.createToken({
      id: user.id,
      sessionId: session.id,
      hash: newHash,
      role: user.role,
    });
  }

  // TODO: add cache
  /* eslint-disable */
  async verifyAccessToken(token: string): Promise<JwtPayloadType> {
    let payload: JwtPayloadType;
    try {
      payload = this.jwtService.verify(token, {
        secret: this.configService.getOrThrow("auth.secret", { infer: true }),
      });
    } catch (error) {
      throw new UnauthorizedException();
    }

    // Force logout if the session is in the blacklist
    // const isSessionBlacklisted = await this.cacheManager.get<boolean>(
    //   createCacheKey(CacheKey.SESSION_BLACKLIST, payload.sessionId),
    // );

    // if (isSessionBlacklisted) {
    //   throw new UnauthorizedException();
    // }

    return payload;
  }

  private verifyRefreshToken(token: string): JwtRefreshPayloadType {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.getOrThrow("auth.refreshSecret", {
          infer: true,
        }),
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async createVerificationToken(data: { id: string }): Promise<string> {
    return await this.jwtService.signAsync(
      {
        id: data.id,
      },
      {
        secret: this.configService.getOrThrow("auth.confirmEmailSecret", {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow("auth.confirmEmailExpires", {
          infer: true,
        }),
      },
    );
  }

  private async createToken(data: {
    id: string;
    sessionId: string;
    hash: string;
    role: string;
  }): Promise<Token> {
    const tokenExpiresIn = this.configService.getOrThrow("auth.expires", {
      infer: true,
    });
    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow("auth.secret", { infer: true }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
          hash: data.hash,
        },
        {
          secret: this.configService.getOrThrow("auth.refreshSecret", {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow("auth.refreshExpires", {
            infer: true,
          }),
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
      tokenExpires,
    } as Token;
  }
}
