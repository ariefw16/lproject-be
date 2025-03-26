import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  username?: string;
}
