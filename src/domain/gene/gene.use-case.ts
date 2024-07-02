import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InsertGeneDto } from './dto/insert-gene.dto';
import { GeneRepository } from './gene.repository';
import { InsertGeneMapper } from './mapper/insert-gene.mapper';
import { Gene } from './gene.entity';

import { GeneService } from './gene.service';

@Injectable()
export class GeneUseCase {
  constructor(
    private geneRepository: GeneRepository,
    private geneService: GeneService,
  ) {}

  async insert(data: InsertGeneDto): Promise<Gene> {
    const gene = InsertGeneMapper.toEntity(data);
    return await this.geneRepository.insert(gene);
  }

  async importGene(data: any): Promise<any> {
    const resource = Object.keys(data)[0];
    const query = data[resource];
    const { response } = await this.geneService.fecthFromHGNC({
      resource,
      query,
    });

    const dataNotFoundInHGNCDatabase =
      response.numFound === 0 || response.numFoundExact === false;

    if (dataNotFoundInHGNCDatabase)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: `The symbol was not found in the HGNC database.`,
        query: data,
      });

    const dataFromHGNC = response.docs[0];
    const dataFromAllianceGenome = (
      await this.geneService.fetchFromAllianceGenome({
        hgncId: dataFromHGNC.hgnc_id,
      })
    ).data;
    const insertGeneData = {
      ...dataFromHGNC,
      ...dataFromAllianceGenome,
    };
    const mappedData: InsertGeneDto =
      InsertGeneMapper.externalAPIsResponseToInsertGeneDTO(insertGeneData);
    return this.insert(mappedData);
  }
}
