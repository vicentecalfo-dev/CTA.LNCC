import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from './config/database/database-config.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [DatabaseConfigModule, DomainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
