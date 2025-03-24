import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @ApiProperty()
  @IsString()
  name?: string;

  @IsOptional()
  @ApiProperty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  password?: string;
}
