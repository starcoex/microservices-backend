import { NestFactory } from '@nestjs/core';
import { AuthModule } from '../../auth/src/auth.module';
import { init, Packages } from '@app/common';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await init(app, 'api', 'PAYMENTS_PORT');
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: Packages.PAYMENTS,
      protoPath: join(__dirname, '../../libs/common/proto/payments.proto'),
      url: app.get(ConfigService).getOrThrow('PAYMENTS_GRPC_URL'),
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
