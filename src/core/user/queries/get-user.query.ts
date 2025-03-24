import { GetListUserDTO } from '../dtos/GetUserDto.dto';

export class GetUserQuery {
  constructor(public readonly dto: GetListUserDTO) {}
}
