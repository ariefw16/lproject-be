import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateKabupatenCommand } from '../create-kabupaten.command';
import { KabupatenService } from '../../services/kabupaten.service';

@CommandHandler(CreateKabupatenCommand)
export class CreateKabupatenHandler
  implements ICommandHandler<CreateKabupatenCommand> {
  constructor(private readonly kabupaten: KabupatenService) { }

  execute(command: CreateKabupatenCommand): Promise<any> {
    return this.kabupaten.create(command.dto);
  }
}
