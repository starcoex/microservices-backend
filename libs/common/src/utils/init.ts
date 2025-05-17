import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

export async function init(
  app: INestApplication,
  globalPrefix?: string,
  _port?: string,
) {
  console.log(globalPrefix, _port);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix(globalPrefix || 'api');
  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  const port = app.get(ConfigService).getOrThrow<string>(_port || 'PORT');
  console.log('port', port);
  await app.listen(port);
  app
    .get(Logger)
    .log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
}
