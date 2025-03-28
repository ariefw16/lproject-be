import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRegionCommand } from '../update-region.command';
import { RegionService } from '../../services/region.service';

@CommandHandler(UpdateRegionCommand)
export class UpdateRegionHandler
  implements ICommandHandler<UpdateRegionCommand> {
  constructor(private readonly region: RegionService) { }

  execute(command: UpdateRegionCommand): Promise<any> {
    return this.region.update(command.dto, command.id);
  }
}
