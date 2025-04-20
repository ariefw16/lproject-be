import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetKabupatenQuery } from '../get-kabupaten.query';
import { KabupatenService } from '../../services/kabupaten.service';

@QueryHandler(GetKabupatenQuery)
export class GetKabupatenHandler implements IQueryHandler<GetKabupatenQuery> {
  constructor(private readonly kabupaten: KabupatenService) { }

  execute(query: GetKabupatenQuery): Promise<any> {
    return this.kabupaten.getData(query.dto);
  }
}
