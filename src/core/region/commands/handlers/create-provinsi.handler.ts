import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProvinsiCommand } from '../create-provinsi.command';
import { ProvinsiService } from '../../services/provinsi.service';

CommandHandler(CreateProvinsiCommand);
export class CreateProvinsiHandler
  implements ICommandHandler<CreateProvinsiCommand>
{
  constructor(private readonly provinsi: ProvinsiService) {}

  execute(command: CreateProvinsiCommand): Promise<any> {
    return this.provinsi.create(command.dto);
  }
}
