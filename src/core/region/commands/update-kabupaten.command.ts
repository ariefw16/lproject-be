import { UpdateKabupatenDTO } from '../dtos/update-kabupaten.dto';

export class UpdateKabupatenCommand {
  constructor(public readonly args: { id: string; data: UpdateKabupatenDTO }) { }
}
