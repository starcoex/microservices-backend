import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { setApp } from './app';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  await app.listen(configService.getOrThrow('GATEWAY_PORT'));
  setApp(app);
}
bootstrap();
