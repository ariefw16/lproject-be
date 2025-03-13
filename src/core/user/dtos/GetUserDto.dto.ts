import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetListUserDTO {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  q?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  limit: number;
}
