import { PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from './CreateUserDTO.dto';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
