import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ValidationExceptionFilter } from './common/filters/validation.filter';
import { AllExceptionFilter } from './common/filters/exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Enable Swagger for Documentation
  const config = new DocumentBuilder()
    .setTitle('L Project Apps')
    .setDescription('List API for L Project App, start Big')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  //enable global interceptor to format response
  app.useGlobalInterceptors(new ResponseInterceptor());
  //enable global pipe, using validation pipe when available on DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException(
          errors.map((error) => ({
            field: error.property,
            errors: Object.values(error.constraints || {}),
          })),
        );
      },
    }),
  );
  // enable reformat for error and exception on response endpoint
  app.useGlobalFilters(
    new ValidationExceptionFilter(),
    new AllExceptionFilter(),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
