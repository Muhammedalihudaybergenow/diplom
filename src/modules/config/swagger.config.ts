import { DocumentBuilder } from '@nestjs/swagger';

export class SwaggerConfig {
  static config() {
    return new DocumentBuilder()
      .setTitle('Diplom example')
      .setDescription('The Diplom API description')
      .setVersion('1.0')
      .addTag('Diplom')
      .addBearerAuth({
        type: 'http',
        bearerFormat: 'bearer',
      })
      .build();
  }
}
