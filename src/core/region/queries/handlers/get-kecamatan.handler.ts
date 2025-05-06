import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetKecamatanQuery } from '../get-kecamatan.query';
import { KecamatanService } from '../../services/kecamatan.service';

@QueryHandler(GetKecamatanQuery)
export class GetKecamatanHandler implements IQueryHandler<GetKecamatanQuery> {
  constructor(private readonly kecamatan: KecamatanService) {}

  execute(query: GetKecamatanQuery): Promise<any> {
    return this.kecamatan.getData(query.dto);
  }
}
