import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const router = (app: INestApplication, configService: ConfigService) => {
  app.setGlobalPrefix('api');

  // Setup Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Template')
    .setDescription('API for Template project')
    .setVersion('0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: configService.get<string>('client.clientUrl'),
    preflightContinue: false,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 204,
  });
};
