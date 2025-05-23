import { NestFactory } from '@nestjs/core';
import { init, Packages } from '@app/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  await init(app, 'notifications', 'NOTIFICATIONS_PORT');
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      url: app
        .get(ConfigService)
        .getOrThrow<string>('NOTIFICATIONS_GRPC_SERVICE_URL'),
      package: Packages.NOTIFICATIONS,
      protoPath: join(
        __dirname,
        '../../',
        'libs/common/proto/notifications.proto',
      ),
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
