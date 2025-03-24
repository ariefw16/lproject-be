import { CreateUserDTO } from '../dtos/CreateUserDTO.dto';

export class CreateUserCommand {
  constructor(private readonly dto: CreateUserDTO) {}
}
