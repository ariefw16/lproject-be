import { PartialType } from '@nestjs/swagger';
import { CreateKabupatenDTO } from './create-kabupaten.dto';

export class UpdateKabupatenDTO extends PartialType(CreateKabupatenDTO) { }
