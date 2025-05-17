import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        AUTH_DATABASE_URL: Joi.string().required(),
        AUTH_GRPC_SERVICE_URL: Joi.string().required(),
        AUTH_JWT_ACCESS_EXPIRATION: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
