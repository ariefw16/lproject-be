import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../get-user.query';
import { UserService } from '../../services/user.service';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userService: UserService) {}

  async execute(query: GetUserQuery) {
    return await this.userService.getUser(query.dto);
  }
}
