import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as express from 'express'
import { join } from 'path'

async function start() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Cloud storage')
    .setDescription('Приложение облачного хранилища для хранения файлов')
    .addBearerAuth()
    .setVersion('1.0.0')
    .build()
  app.enableCors()

  app.use(
    '/static/files',
    express.static(join(__dirname, '..', 'static/files')),
  )

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  await app.listen(process.env.PORT)
}
start()
