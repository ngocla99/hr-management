import { ApiModule } from "@/api/api.module";
import authConfig from "@/api/auth/config/auth.config";
// import { BackgroundModule } from "@/background/background.module";
import appConfig from "@/config/app.config";
import { AllConfigType } from "@/config/config.type";
import { Environment } from "@/constants/app.constant";
import databaseConfig from "@/database/config/database.config";
import mailConfig from "@/mail/config/mail.config";
import { MailModule } from "@/mail/mail.module";
import redisConfig from "@/redis/config/redis.config";
import { ModuleMetadata } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import { LoggerModule } from "nestjs-pino";
import path from "path";
import loggerFactory from "./logger-factory";

function generateModulesSet() {
  const imports: ModuleMetadata["imports"] = [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig, authConfig, mailConfig],
      envFilePath: [".env"],
    }),
  ];
  let customModules: ModuleMetadata["imports"] = [];

  const dbModule = MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService<AllConfigType>) => {
      const uri = configService.getOrThrow("database.uri", { infer: true });
      return {
        uri,
      };
    },
    inject: [ConfigService],
  });

  //   const bullModule = BullModule.forRootAsync({
  //     imports: [ConfigModule],
  //     useFactory: (configService: ConfigService<AllConfigType>) => {
  //       return {
  //         connection: {
  //           host: configService.getOrThrow("redis.host", {
  //             infer: true,
  //           }),
  //           port: configService.getOrThrow("redis.port", {
  //             infer: true,
  //           }),
  //           password: configService.getOrThrow("redis.password", {
  //             infer: true,
  //           }),
  //           tls: configService.get("redis.tlsEnabled", { infer: true }),
  //         },
  //       };
  //     },
  //     inject: [ConfigService],
  //   });

  const i18nModule = I18nModule.forRootAsync({
    resolvers: [
      { use: QueryResolver, options: ["lang"] },
      AcceptLanguageResolver,
      new HeaderResolver(["x-lang"]),
    ],
    useFactory: (configService: ConfigService<AllConfigType>) => {
      const env = configService.get("app.nodeEnv", { infer: true });
      const isLocal = env === Environment.LOCAL;
      const isDevelopment = env === Environment.DEVELOPMENT;
      return {
        fallbackLanguage: configService.getOrThrow("app.fallbackLanguage", {
          infer: true,
        }),
        loaderOptions: {
          path: path.join(__dirname, "/../i18n/"),
          watch: isLocal,
        },
        typesOutputPath: path.join(__dirname, "../../src/generated/i18n.generated.ts"),
        logging: isLocal || isDevelopment, // log info on missing keys
      };
    },
    inject: [ConfigService],
  });

  const loggerModule = LoggerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: loggerFactory,
  });

  //   const cacheModule = CacheModule.registerAsync({
  //     imports: [ConfigModule],
  //     useFactory: async (configService: ConfigService<AllConfigType>) => {
  //       return {
  //         store: await redisStore({
  //           host: configService.getOrThrow("redis.host", {
  //             infer: true,
  //           }),
  //           port: configService.getOrThrow("redis.port", {
  //             infer: true,
  //           }),
  //           password: configService.getOrThrow("redis.password", {
  //             infer: true,
  //           }),
  //           tls: configService.get("redis.tlsEnabled", { infer: true }),
  //         }),
  //       };
  //     },
  //     isGlobal: true,
  //     inject: [ConfigService],
  //   });

  const modulesSet = process.env.MODULES_SET || "monolith";

  switch (modulesSet) {
    case "monolith":
      customModules = [
        ApiModule,
        // bullModule,
        // BackgroundModule,
        // cacheModule,
        dbModule,
        i18nModule,
        loggerModule,
        MailModule,
      ];
      break;
    case "api":
      customModules = [
        ApiModule,
        // bullModule,
        // cacheModule,
        dbModule,
        i18nModule,
        loggerModule,
        MailModule,
      ];
      break;
    case "background":
      customModules = [
        // bullModule,
        // BackgroundModule,
        // cacheModule,
        dbModule,
        i18nModule,
        loggerModule,
      ];
      break;
    default:
      console.error(`Unsupported modules set: ${modulesSet}`);
      break;
  }

  return imports.concat(customModules);
}

export default generateModulesSet;
