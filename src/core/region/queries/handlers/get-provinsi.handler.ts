import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProvinsiQuery } from '../get-provinsi.query';
import { ProvinsiService } from '../../services/provinsi.service';

@QueryHandler(GetProvinsiQuery)
export class GetProvinsiHandler implements IQueryHandler<GetProvinsiQuery> {
  constructor(private readonly provinsi: ProvinsiService) {}

  execute(query: GetProvinsiQuery): Promise<any> {
    return this.provinsi.getData(query.dto);
  }
}
