import validateConfig from "@/utils/validate-config";
import { registerAs } from "@nestjs/config";
import { IsInt, IsString, Max, Min, ValidateIf } from "class-validator";
import { DatabaseConfig } from "./database-config.type";

class EnvironmentVariablesValidator {
  @ValidateIf((envValues: Record<string, any>) => !!envValues.DATABASE_URL)
  @IsString()
  DATABASE_URL: string;

  @ValidateIf((envValues: Record<string, any>) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_TYPE: string;

  @ValidateIf((envValues: Record<string, any>) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_HOST: string;

  @ValidateIf((envValues: Record<string, any>) => !envValues.DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number;

  @ValidateIf((envValues: Record<string, any>) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_PASSWORD: string;

  @ValidateIf((envValues: Record<string, any>) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_NAME: string;

  @ValidateIf((envValues: Record<string, any>) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_USERNAME: string;
}

export default registerAs<DatabaseConfig>("database", () => {
  console.info(`Register DatabaseConfig from environment variables`);
  validateConfig(process.env, EnvironmentVariablesValidator);

  // If DATABASE_URL is provided, use it directly
  if (process.env.DATABASE_URL) {
    return {
      uri: process.env.DATABASE_URL,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    };
  }

  // Build URI from individual components
  const config = {
    type: process.env.DATABASE_TYPE || "mongodb",
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 27017,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME || "test",
  };

  // Construct URI based on whether authentication is required
  let uri: string;
  const hasAuth = config.username && config.password;

  if (config.host.includes("localhost")) {
    if (hasAuth) {
      // No authentication required (local development)
      uri = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.name}`;
    } else {
      // Local/custom MongoDB with auth
      uri = `mongodb://${config.host}:${config.port}/${config.name}`;
    }
  } else {
    // Use mongodb+srv for cloud connections with auth
    uri = `mongodb+srv://${config.username}:${config.password}@${config.host}/${config.name}`;
  }

  return {
    uri,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };
});
