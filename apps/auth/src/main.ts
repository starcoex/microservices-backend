import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { init } from '@app/common/utils';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await init(app, 'auth', 'AUTH_PORT');
}
bootstrap();
