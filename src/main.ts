import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { knife4jSetup } from 'nestjs-knife4j';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { HttpExceptionFilter } from './common/filters';
import { TransformInterceptor } from './common/interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //增加 swagger配置
  const options = new DocumentBuilder()
    .setTitle('React admin backend')
    .setDescription('React admin backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  //增加 knife4配置
  knife4jSetup(app, {
    urls: [
      {
        name: '2.X版本',
        url: `/api-json`,
        swaggerVersion: '3.0',
        location: `/api-json`,
      },
    ],
  });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 增加content-path
  app.setGlobalPrefix('example');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ');
  console.log('Swagger url :>> ', 'http://localhost:3000/doc.html');
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ');
  await app.listen(3000);
}
bootstrap();
