import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRegionCommand } from '../delete-region.command';
import { RegionService } from '../../services/region.service';

CommandHandler(DeleteRegionCommand);
export class DeleteRegionHandler
  implements ICommandHandler<DeleteRegionCommand> {
  constructor(private readonly region: RegionService) { }

  execute(command: DeleteRegionCommand): Promise<any> {
    return this.region.delete(command.id);
  }
}
