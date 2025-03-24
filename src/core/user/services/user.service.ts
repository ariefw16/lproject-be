import { Injectable } from '@nestjs/common';
import { GetListUserDTO } from '.././dtos/GetUserDto.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDTO } from '.././dtos/CreateUserDTO.dto';
import { Prisma } from '@prisma/client';
import { UpdateUserDTO } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async getUser(dto: GetListUserDTO) {
    const { page, q, limit } = dto;
    const where: Prisma.UserWhereInput = {
      name: { contains: q },
      email: { contains: q },
    };
    const [data, count] = await Promise.all([
      this.prisma.user.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where,
      }),
      this.prisma.user.count({ where }),
    ]);
    return {
      data,
      meta: {
        count,
        page,
        limit,
      },
    };
  }

  async create(data: CreateUserDTO) {
    return await this.prisma.user.create({ data });
  }

  async update(data: UpdateUserDTO, id: string) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
