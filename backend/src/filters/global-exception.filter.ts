/* eslint-disable */
import { ErrorDetailDto } from "@/common/dto/error-detail.dto";
import { ErrorDto } from "@/common/dto/error.dto";
import { AllConfigType } from "@/config/config.type";
import { ErrorCode } from "@/constants/error-code.constant";
import { ValidationException } from "@/exceptions/validation.exception";
import { I18nTranslations } from "@/generated/i18n.generated";
import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
  ValidationError,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { STATUS_CODES } from "http";
import { Error as MongooseError } from "mongoose";
import { I18nContext } from "nestjs-i18n";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private i18n: I18nContext<I18nTranslations>;
  private debug: boolean = false;
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly configService: ConfigService<AllConfigType>) {}

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    this.i18n = request.i18nContext;
    this.debug = this.configService.getOrThrow("app.debug", { infer: true });

    let error: ErrorDto;

    if (exception instanceof UnprocessableEntityException) {
      error = this.handleUnprocessableEntityException(exception);
    } else if (exception instanceof ValidationException) {
      error = this.handleValidationException(exception);
    } else if (exception instanceof NotFoundException) {
      error = this.handleNotFoundException(exception);
    } else if (exception instanceof HttpException) {
      error = this.handleHttpException(exception);
    } else if (exception instanceof MongooseError.CastError) {
      error = this.handleCastError(exception);
    } else if (exception instanceof MongooseError.ValidationError) {
      error = this.handleMongooseValidationError(exception);
    } else if (exception.name === "MongoServerError" && exception.code === 11000) {
      error = this.handleDuplicateKeyError(exception);
    } else {
      error = this.handleError(exception);
    }

    if (this.debug) {
      error.stack = exception.stack;
      error.trace = exception;

      this.logger.debug(error);
    }

    response.status(error.statusCode).json(error);
  }

  /**
   * Handles UnprocessableEntityException:
   * Check the request payload
   * Validate the input
   * @param exception UnprocessableEntityException
   * @returns ErrorDto
   */
  private handleUnprocessableEntityException(exception: UnprocessableEntityException): ErrorDto {
    const r = exception.getResponse() as { message: ValidationError[] };
    const statusCode = exception.getStatus();

    const errorRes = {
      timestamp: new Date().toISOString(),
      statusCode,
      error: STATUS_CODES[statusCode]!,
      message: "Validation failed",
      details: this.extractValidationErrorDetails(r.message),
    };

    this.logger.debug(exception);

    return errorRes;
  }

  /**
   * Handles validation errors
   * @param exception ValidationException
   * @returns ErrorDto
   */
  private handleValidationException(exception: ValidationException): ErrorDto {
    const r = exception.getResponse() as {
      errorCode: ErrorCode;
      message: string;
    };
    const statusCode = exception.getStatus();

    const errorRes = {
      timestamp: new Date().toISOString(),
      statusCode,
      error: STATUS_CODES[statusCode]!,
      errorCode: Object.keys(ErrorCode)[Object.values(ErrorCode).indexOf(r.errorCode)],
      message: r.message || this.i18n.t(r.errorCode as unknown as keyof I18nTranslations),
    };

    this.logger.debug(exception);

    return errorRes;
  }

  /**
   * Handles NotFoundException
   * @param exception NotFoundException
   * @returns ErrorDto
   */
  private handleNotFoundException(exception: NotFoundException): ErrorDto {
    const r = exception.getResponse() as {
      message: string;
    };

    const statusCode = exception.getStatus();

    const errorRes = {
      timestamp: new Date().toISOString(),
      statusCode,
      error: STATUS_CODES[statusCode]!,
      errorCode: "N001",
      message:
        (this.i18n.t(r.message as unknown as keyof I18nTranslations) as string) ||
        this.i18n.t("common.error.entity_not_found" as unknown as keyof I18nTranslations)!,
    };

    this.logger.debug(exception);

    return errorRes;
  }

  /**
   * Handles HttpException
   * @param exception HttpException
   * @returns ErrorDto
   */
  private handleHttpException(exception: HttpException): ErrorDto {
    const statusCode = exception.getStatus();
    const errorRes = {
      timestamp: new Date().toISOString(),
      statusCode,
      error: STATUS_CODES[statusCode]!,
      message: exception.message,
    };

    this.logger.debug(exception);

    return errorRes;
  }

  /**
   * Handles Mongoose CastError (invalid ObjectId, type casting failures)
   * @param error MongooseError.CastError
   * @returns ErrorDto
   */
  private handleCastError(error: MongooseError.CastError): ErrorDto {
    const statusCode = HttpStatus.BAD_REQUEST;
    const errorRes = {
      timestamp: new Date().toISOString(),
      statusCode,
      error: STATUS_CODES[statusCode] || "Bad Request",
      message: `Invalid ${error.path}: ${error.value}`,
    };

    this.logger.debug(error);
    return errorRes;
  }

  /**
   * Handles Mongoose ValidationError (schema validation failures)
   * @param error MongooseError.ValidationError
   * @returns ErrorDto
   */
  private handleMongooseValidationError(error: MongooseError.ValidationError): ErrorDto {
    const statusCode = HttpStatus.BAD_REQUEST;
    const errorRes = {
      timestamp: new Date().toISOString(),
      statusCode,
      error: STATUS_CODES[statusCode] || "Bad Request",
      message: "Validation failed",
      details: Object.values(error.errors).map((err: any) => ({
        property: err.path,
        code: err.kind,
        message: err.message,
      })),
    };

    this.logger.debug(error);
    return errorRes;
  }

  /**
   * Handles MongoDB duplicate key error (unique constraint violations)
   * @param error any (MongoServerError with code 11000)
   * @returns ErrorDto
   */
  private handleDuplicateKeyError(error: any): ErrorDto {
    const statusCode = HttpStatus.CONFLICT;
    const field = Object.keys(error.keyPattern || {})[0] || "field";
    const errorRes = {
      timestamp: new Date().toISOString(),
      statusCode,
      error: STATUS_CODES[statusCode] || "Conflict",
      message: `Duplicate value for ${field}`,
    };

    this.logger.debug(error);
    return errorRes;
  }

  /**
   * Handles generic errors
   * @param error Error
   * @returns ErrorDto
   */
  private handleError(error: Error): ErrorDto {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorRes = {
      timestamp: new Date().toISOString(),
      statusCode,
      error: STATUS_CODES[statusCode]!,
      message: error?.message || "An unexpected error occurred",
    };

    this.logger.error(error);

    return errorRes;
  }

  /**
   * Extracts error details from ValidationError[]
   * @param errors ValidationError[]
   * @returns ErrorDetailDto[]
   */
  private extractValidationErrorDetails(errors: ValidationError[]): ErrorDetailDto[] {
    const extractErrors = (
      error: ValidationError,
      parentProperty: string = "",
    ): ErrorDetailDto[] => {
      const propertyPath = parentProperty ? `${parentProperty}.${error.property}` : error.property;

      const currentErrors: ErrorDetailDto[] = Object.entries(error.constraints || {}).map(
        ([code, message]) => ({
          property: propertyPath,
          code,
          message,
        }),
      );

      const childErrors: ErrorDetailDto[] =
        error.children?.flatMap((childError) => extractErrors(childError, propertyPath)) || [];

      return [...currentErrors, ...childErrors];
    };

    return errors.flatMap((error) => extractErrors(error));
  }
}
