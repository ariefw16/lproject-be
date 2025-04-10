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
  private readonly selectNormal: Prisma.UserSelect;

  constructor(private readonly prisma: PrismaService) {
    this.selectNormal = {
      id: true,
      name: true,
      email: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  async getUser(dto: GetListUserDTO): Promise<APIResponse<UserEntity[]>> {
    const { page, q, limit } = dto;
    const where: Prisma.UserWhereInput = {
      name: { contains: q },
      email: { contains: q },
      deletedAt: null,
    };

    const [user, total] = await Promise.all([
      this.prisma.user.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where,
        select: this.selectNormal,
      }),
      this.prisma.user.count({ where }),
    ]);

    const data = plainToInstance(UserEntity, user, {
      excludeExtraneousValues: true,
    });

    return {
      success: true,
      status: 200,
      message: 'Fetching data success',
      data,
      meta: {
        total,
        current_page: page,
        per_page: limit,
        last_page: Math.ceil(total / limit),
      },
    };
  }

  async getUserByUsername(username: string): Promise<APIResponse<UserEntity>> {
    const where: Prisma.UserWhereInput = {
      deletedAt: null,
      username,
    };
    const user = await this.prisma.user.findFirst({
      where,
      select: this.selectNormal,
    });

    const data = plainToInstance(UserEntity, user, {
      excludeExtraneousValues: true,
    });

    return {
      success: true,
      status: 200,
      message: 'Fetching Data Success',
      data,
      meta: {
        total: 1,
        last_page: null,
        per_page: null,
        current_page: null,
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

    //check if user already exists but is deleted
    //update if exist
    //create if not exist
    if (userExists) {
      user = await this.prisma.user.update({
        where: { id: userExists.id },
        data: { deletedAt: null, updatedAt: new Date() },
        select: this.selectNormal,
      });
    } else {
      user = await this.prisma.user.create({
        data,
        select: this.selectNormal,
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

  async update(
    data: UpdateUserDTO,
    id: string,
  ): Promise<APIResponse<UserEntity>> {
    const user = await this.prisma.user.update({
      where: { id, deletedAt: null },
      data,
      select: this.selectNormal,
    });

    const res = plainToInstance(UserEntity, user, {
      excludeExtraneousValues: true,
    });

    return {
      data: res,
      message: 'User Updated Successfully',
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

  async delete(id: string): Promise<APIResponse<string>> {
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: { id: true },
    });

    return {
      data: id,
      message: 'User Deleted Successfully',
      status: 200,
      success: true,
      meta: {
        total: 1,
        per_page: null,
        current_page: null,
        last_page: null,
      },
    };
  }
}
