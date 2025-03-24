import { UpdateUserDTO } from '../dtos/update-user.dto';

export class UpdateUserCommand {
  constructor(
    public readonly dto: UpdateUserDTO,
    public readonly id: string,
  ) { }
}
