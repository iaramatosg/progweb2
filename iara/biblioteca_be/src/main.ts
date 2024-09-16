import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(port);

  Logger.debug(`[PORT]: ${port}`);
  Logger.debug(`[Environment] ${process.env.NODE_ENV || 'development'}`);
}
bootstrap();
