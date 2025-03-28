import { UpdateRegionDTO } from '../dtos/update-region.dto';

export class UpdateRegionCommand {
  constructor(
    public readonly dto: UpdateRegionDTO,
    public readonly id: string,
  ) { }
}
