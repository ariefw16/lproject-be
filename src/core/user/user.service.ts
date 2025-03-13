import { Injectable } from '@nestjs/common';
import { GetListUserDTO } from './dtos/GetUserDto.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async getUser(dto: GetListUserDTO) {
    return await this.prisma.user.findMany();
  }
}
