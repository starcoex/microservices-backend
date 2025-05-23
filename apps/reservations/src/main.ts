import { NestFactory } from '@nestjs/core';
import { init } from '@app/common';
import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  await init(app, 'api', 'RESERVATIONS_PORT');
}
bootstrap();
