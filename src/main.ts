import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe, HttpStatus } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //global prefix ***add 'api' at this not at path in controller*** for every route path
  app.setGlobalPrefix('api');
  //add versioning: open api versioning then in each controller, defined the version
  app.enableVersioning({
    type: VersioningType.URI,
  });
  //add auto data validation: .
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, //status 422
    }),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
