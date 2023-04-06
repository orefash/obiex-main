import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Documen}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get<number>('APP_PORT') || 4500);
}
bootstrap();
