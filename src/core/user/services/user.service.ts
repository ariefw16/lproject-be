import { Injectable } from '@nestjs/common';
import { GetListUserDTO } from '.././dtos/GetUserDto.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDTO } from '.././dtos/CreateUserDTO.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(dto: GetListUserDTO) {
    return await this.prisma.user.findMany({
      take: dto.limit,
      skip: (dto.page - 1) * dto.limit,
    });
  }

  async create(data: CreateUserDTO) {
    return await this.prisma.user.create({ data });
  }
}
