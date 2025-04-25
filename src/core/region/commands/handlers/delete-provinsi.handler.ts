import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProvinsiCommand } from '../delete-provinsi.command';
import { ProvinsiService } from '../../services/provinsi.service';

@CommandHandler(DeleteProvinsiCommand)
export class DeleteProvinsiHandler
  implements ICommandHandler<DeleteProvinsiCommand>
{
  constructor(private readonly provinsi: ProvinsiService) {}

  execute(command: DeleteProvinsiCommand): Promise<any> {
    const { id } = command.args;
    return this.provinsi.delete(id);
  }
}
