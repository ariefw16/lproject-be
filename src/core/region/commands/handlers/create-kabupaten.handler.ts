import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateKabupatenCommand } from '../create-kabupaten.command';
import { KabupatenService } from '../../services/kabupaten.service';

@CommandHandler(CreateKabupatenCommand)
export class CreateKabupatenHandler
  implements ICommandHandler<CreateKabupatenCommand> {
  constructor(private readonly kabupaten: KabupatenService) { }

  execute(command: CreateKabupatenCommand): Promise<any> {
    const { data } = command.args;
    return this.kabupaten.create(data);
  }
}
