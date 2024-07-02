import { Module } from '@nestjs/common';
import { MongoDBConfigModule } from './mongodb/mongodb-config.module';

@Module({
  imports: [MongoDBConfigModule],
})
export class DatabaseConfigModule {}
