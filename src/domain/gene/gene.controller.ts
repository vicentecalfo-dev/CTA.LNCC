import { Body, Controller, Post, Version } from '@nestjs/common';
import { GeneUseCase } from './gene.use-case';
import { InsertGeneDto } from './dto/insert-gene.dto';
import { Gene } from './gene.entity';

@Controller()
export class GeneController {


  constructor(
    private geneUseCase: GeneUseCase
  ){}

  @Version('1')
  @Post('gene')
  async insert(@Body() data: InsertGeneDto): Promise<Gene> {
    return await this.geneUseCase.insert(data);
  }

  @Version('1')
  @Post('gene/import/')
  async importGene(@Body() data: any): Promise<any> {
    return await this.geneUseCase.importGene(data);
  }

}
