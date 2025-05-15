import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteKecamatanCommand } from '../delete-kecamatan.command';
import { KecamatanService } from '../../services/kecamatan.service';

@CommandHandler(DeleteKecamatanCommand)
export class DeleteKecamatanHandler
  implements ICommandHandler<DeleteKecamatanCommand> {
  constructor(private readonly kecamatan: KecamatanService) { }

  execute(command: DeleteKecamatanCommand): Promise<any> {
    const { id } = command.args;
    return this.kecamatan.delete(id);
  }
}
