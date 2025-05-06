import { PartialType } from '@nestjs/swagger';
import { CreateKecamatanDTO } from './create-kecamatan.dto';

export class UpdateKecamatanDTO extends PartialType(CreateKecamatanDTO) {}
