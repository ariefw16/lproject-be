import { CreateKabupatenDTO } from '../dtos/create-kabupaten.dto';

export class CreateKabupatenCommand {
  constructor(public readonly args: { data: CreateKabupatenDTO }) { }
}
