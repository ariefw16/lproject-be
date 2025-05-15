import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateKecamatanCommand } from '../update-kecamatan.command';
import { KecamatanService } from '../../services/kecamatan.service';

@CommandHandler(UpdateKecamatanCommand)
export class UpdateKecamatanHandler
  implements ICommandHandler<UpdateKecamatanCommand> {
  constructor(private readonly kecamatan: KecamatanService) { }

  execute(command: UpdateKecamatanCommand): Promise<any> {
    const { id, data } = command.args;
    return this.kecamatan.update(id, data);
  }
}
