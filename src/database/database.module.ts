import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schemas/user.schema';
import { Headquarter } from './schemas/headquarter.schema';
import { Weekday } from './schemas/weekday.schema';
import { Schedule } from './schemas/schedule.schema';
import { Permission } from './schemas/permission.schema';
import { Assistance } from './schemas/assistance.schema';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [
          User,
          Headquarter,
          Weekday,
          Schedule,
          Permission,
          Assistance,
        ],
        synchronize: true,
        timezone: '-05:00',
      }),
      inject: [ConfigService],
    }),
    RepositoriesModule,
  ],
})
export class DatabaseModule {}
