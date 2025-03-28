import { CreateRegionDTO } from '../dtos/create-region.dto';

export class CreateRegionCommand {
  constructor(public readonly dto: CreateRegionDTO) { }
}
