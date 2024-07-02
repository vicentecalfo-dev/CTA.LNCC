import { Module } from '@nestjs/common';
import { GeneModule } from './gene/gene.module';

@Module({
  imports: [GeneModule],
  providers: [],
  exports: [],
})
export class DomainModule {}
