import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProvinsiCommand } from '../update-provinsi.command';
import { ProvinsiService } from '../../services/provinsi.service';

@CommandHandler(UpdateProvinsiCommand)
export class UpdateProvinsiHandler
  implements ICommandHandler<UpdateProvinsiCommand> {
  constructor(private readonly provinsi: ProvinsiService) { }

  execute(command: UpdateProvinsiCommand): Promise<any> {
    const { id, data } = command.args;
    return this.provinsi.update(data, id);
  }
}
