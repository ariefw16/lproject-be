import { CreateUserDTO } from '../dtos/CreateUserDTO.dto';

export class CreateUserCommand {
  constructor(public readonly dto: CreateUserDTO) { }
}
