import { PartialType } from '@nestjs/swagger';
import { CreateProvinsiDTO } from './create-provinsi.dto';

export class UpdateProvinsiDTO extends PartialType(CreateProvinsiDTO) { }
