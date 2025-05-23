import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { init } from '@app/common/utils';
import { join } from 'path';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Packages } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await init(app, 'api', 'AUTH_PORT');
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      url: app.get(ConfigService).getOrThrow('AUTH_GRPC_SERVICE_URL'),
      package: Packages.AUTH,
      protoPath: join(__dirname, '../../libs/common/proto/auth.proto'),
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
