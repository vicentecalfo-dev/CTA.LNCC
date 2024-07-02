import { HttpStatus, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gene } from './gene.entity';

@Injectable()
export class GeneRepository {
  constructor(
    @InjectRepository(Gene)
    private typeOrmRepo: Repository<Gene>,
  ) {}

  async insert(data: Gene): Promise<Gene> {
    try{
      await this.typeOrmRepo.insert(data);
      return data;
    }catch(error){
      throw new ServiceUnavailableException({
        status: HttpStatus.SERVICE_UNAVAILABLE,
        message: `Database is temporarily unavailable.`
      })
    }
  }
}
