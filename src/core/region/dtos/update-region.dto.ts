import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateRegionDTO {
  @ApiPropertyOptional()
  @IsOptional()
  name?: string;
}
