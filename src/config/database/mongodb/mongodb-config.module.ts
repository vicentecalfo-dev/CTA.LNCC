import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Gene } from '@/domain/gene/gene.entity';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get<string>('MONGODB_HOST'),
        database: configService.get<string>('MONGODB_NAME'),
        entities: [
          Gene
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class MongoDBConfigModule {}
