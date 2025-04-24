import { UpdateProvinsiDTO } from '../dtos/update-provinsi.dto';

export class UpdateProvinsiCommand {
  constructor(
    public readonly args: {
      id: string;
      data: UpdateProvinsiDTO;
    },
  ) { }
}
