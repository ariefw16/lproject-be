import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../update-user.command';
import { UserService } from '../../services/user.service';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userService: UserService) { }

  execute(command: UpdateUserCommand): Promise<any> {
    return this.userService.update(command.dto, command.id);
  }
}
