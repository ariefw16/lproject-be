import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRegionQuery } from '../get-region.query';
import { RegionService } from '../../services/region.service';

@QueryHandler(GetRegionQuery)
export class GetRegionHandler implements IQueryHandler<GetRegionQuery> {
  constructor(private readonly region: RegionService) { }

  execute(query: GetRegionQuery): Promise<any> {
    return this.region.getData(query.dto);
  }
}
