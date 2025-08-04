import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import * as Joi from 'joi';
import configuration from './config/enviroment';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './common/guards/role.guard';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule,
    JwtModule,
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DATABASE_HOST: Joi.string().hostname().required(),
        DATABASE_PORT: Joi.number().port().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknow: false,
        abortEarly: true,
      },
    }),
    DatabaseModule,
    AdminModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
