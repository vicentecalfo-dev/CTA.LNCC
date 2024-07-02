import { HGNC } from '@labinfo/hgnc-get-gene-info';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class GeneService {
  constructor(
    private readonly httpService: HttpService,
    private hgncService: HGNC,
  ) {}

  fetchFromAllianceGenome({ hgncId }): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef.get(
      `https://www.alliancegenome.org/api/gene/${encodeURIComponent(hgncId)}`, {
        headers:{
            accept: "application/json"
        }
      }
    );
  }

  fecthFromHGNC({ resource, query }): Promise<any> {
    return this.hgncService.fetchBy(resource, query);
  }
}
