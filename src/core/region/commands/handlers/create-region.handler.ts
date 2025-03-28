import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRegionCommand } from '../create-region.command';
import { RegionService } from '../../services/region.service';

@CommandHandler(CreateRegionCommand)
export class CreateRegionHandler
  implements ICommandHandler<CreateRegionCommand> {
  constructor(private readonly region: RegionService) { }

  execute(command: CreateRegionCommand): Promise<any> {
    return this.region.create(command.dto);
  }
}
