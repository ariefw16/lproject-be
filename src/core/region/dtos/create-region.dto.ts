import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
