import { UpdateRegionDTO } from '../dtos/update-region.dto';

export class UpdateRegionCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateRegionDTO,
  ) { }
}
