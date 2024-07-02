import { Module } from '@nestjs/common';
import { GeneController } from './gene.controller';
import { GeneUseCase } from './gene.use-case';
import { GeneRepository } from './gene.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gene } from './gene.entity';
import { HGNC } from '@labinfo/hgnc-get-gene-info';
import { HttpModule } from '@nestjs/axios';
import { GeneService } from './gene.service';

@Module({
  controllers: [GeneController],
  providers: [GeneUseCase, GeneRepository, HGNC, GeneService],
  imports: [TypeOrmModule.forFeature([Gene]), HttpModule],
  exports: [],
})
export class GeneModule {}
