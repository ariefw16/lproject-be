import { CreateKecamatanDTO } from '../dtos/create-kecamatan.dto';

export class CreateKecamatanCommand {
  constructor(public readonly args: { data: CreateKecamatanDTO }) {}
}
