import { UpdateKecamatanDTO } from '../dtos/update-kecamatan.dto';

export class UpdateKecamatanCommand {
  constructor(public readonly args: { id: string; data: UpdateKecamatanDTO }) { }
}
