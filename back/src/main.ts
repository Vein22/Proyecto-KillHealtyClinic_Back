import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middleware/loger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); 
  app.use(LoggerGlobal);
  app.enableCors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', credentials: true, });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
