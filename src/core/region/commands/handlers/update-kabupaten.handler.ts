import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateKabupatenCommand } from '../update-kabupaten.command';
import { KabupatenService } from '../../services/kabupaten.service';

@CommandHandler(UpdateKabupatenCommand)
export class UpdateKabupatenHandler
  implements ICommandHandler<UpdateKabupatenCommand>
{
  constructor(private readonly kabupaten: KabupatenService) {}

  execute(command: UpdateKabupatenCommand): Promise<any> {
    const { id, data } = command.args;
    return this.kabupaten.update(id, data);
  }
}
