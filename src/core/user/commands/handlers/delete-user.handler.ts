import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../delete-user.command';
import { UserService } from '../../services/user.service';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userService: UserService) { }

  execute(command: DeleteUserCommand): Promise<any> {
    return this.userService.delete(command.id);
  }
}
