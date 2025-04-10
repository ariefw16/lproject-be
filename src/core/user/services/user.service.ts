import { Injectable } from '@nestjs/common';
import { GetListUserDTO } from '.././dtos/GetUserDto.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDTO } from '.././dtos/CreateUserDTO.dto';
import { Prisma } from '@prisma/client';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { APIResponse } from 'src/common/interfaces/APIResponse.interface';
import { UserEntity } from '../entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async getUser(dto: GetListUserDTO) {
    const { page, q, limit } = dto;
    const where: Prisma.UserWhereInput = {
      name: { contains: q },
      email: { contains: q },
      deletedAt: null,
    };
    const [data, count] = await Promise.all([
      this.prisma.user.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
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

  async getUserByUsername(username: string) {
    const where: Prisma.UserWhereInput = {
      deletedAt: null,
      username,
    };
    const data = await this.prisma.user.findMany({
      take: 1,
      where,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      data,
      meta: {
        count: 1,
      },
    };
  }

  async create(data: CreateUserDTO): Promise<APIResponse<UserEntity>> {
    const where: Prisma.UserWhereInput = {
      email: data.email,
      deletedAt: null,
    };
    const userExists = await this.prisma.user.findFirst({ where });
    let user: any;

    if (userExists) {
      user = await this.prisma.user.update({
        where: { id: userExists.id },
        data: { deletedAt: null, updatedAt: new Date() },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } else {
      user = await this.prisma.user.create({
        data,
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    const res = plainToInstance(UserEntity, user, {
      excludeExtraneousValues: true,
    });
    return {
      data: res,
      message: 'User Created Successfully',
      status: 201,
      success: true,
      meta: {
        total: 1,
        per_page: null,
        current_page: null,
        last_page: null,
      },
    };
  }

  async update(data: UpdateUserDTO, id: string) {
    return await this.prisma.user.update({
      where: { id, deletedAt: null },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: { id: true },
    });
  }
}
