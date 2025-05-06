import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateKecamatanCommand } from '../create-kecamatan.command';
import { KecamatanService } from '../../services/kecamatan.service';

@CommandHandler(CreateKecamatanCommand)
export class CreateKecamatanHandler
  implements ICommandHandler<CreateKecamatanCommand>
{
  constructor(private readonly kecamatan: KecamatanService) {}

  execute(command: CreateKecamatanCommand): Promise<any> {
    const { data } = command.args;
    return this.kecamatan.create(data);
  }
}
