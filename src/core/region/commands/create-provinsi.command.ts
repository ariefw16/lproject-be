import { CreateProvinsiDTO } from '../dtos/create-provinsi.dto';

export class CreateProvinsiCommand {
  constructor(public readonly dto: CreateProvinsiDTO) {}
}
