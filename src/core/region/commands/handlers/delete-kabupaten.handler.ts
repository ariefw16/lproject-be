import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteKabupatenCommand } from '../delete-kabupaten.command';
import { KabupatenService } from '../../services/kabupaten.service';

@CommandHandler(DeleteKabupatenCommand)
export class DeleteKabupatenHandler
  implements ICommandHandler<DeleteKabupatenCommand>
{
  constructor(private readonly kabupaten: KabupatenService) {}

  execute(command: DeleteKabupatenCommand): Promise<any> {
    return this.kabupaten.delete(command.id);
  }
}
