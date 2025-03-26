import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByUsernameQuery } from '../get-user-username.query';
import { UserService } from '../../services/user.service';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler
  implements IQueryHandler<GetUserByUsernameQuery> {
  constructor(private readonly userService: UserService) { }

  async execute(query: GetUserByUsernameQuery): Promise<any> {
    return await this.userService.getUserByUsername(query.username);
  }
}
