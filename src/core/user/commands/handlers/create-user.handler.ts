import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { UserService } from '../../services/user.service';
import { APIResponse } from 'src/common/interfaces/APIResponse.interface';
import { UserEntity } from '../../entities/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userService: UserService) {}

  execute(command: CreateUserCommand): Promise<APIResponse<UserEntity>> {
    return this.userService.create({ ...command.dto });
  }
}
