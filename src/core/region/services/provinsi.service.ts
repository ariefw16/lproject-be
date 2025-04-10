import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetProvinsiDTO } from '../dtos/get-provinsi.dto';
import { CreateProvinsiDTO } from '../dtos/create-provinsi.dto';
import { Prisma } from '@prisma/client';
import { APIResponse } from 'src/common/interfaces/APIResponse.interface';
import { ProvinsiEntity } from '../entities/provinsi.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProvinsiService {
  private readonly normalSelect: Prisma.ProvinsiSelect;
  constructor(private readonly prisma: PrismaService) {
    this.normalSelect = {
      id: true,
      name: true,
      createdAt: true,
      deletedAt: true,
      updatedAt: true,
      kabupaten: true,
      regional: true,
      regionalId: true,
    };
  }

  async create(dto: CreateProvinsiDTO): Promise<APIResponse<ProvinsiEntity>> {
    const { ...data } = dto;
    const prov = await this.prisma.provinsi.create({
      data,
      select: this.normalSelect,
    });

    const res = plainToInstance(ProvinsiEntity, prov, {
      excludeExtraneousValues: true,
    });

    return {
      success: true,
      status: 201,
      message: 'Provinsi Created Successfully',
      data: res,
    };
  }

  async getData(dto: GetProvinsiDTO): Promise<APIResponse<ProvinsiEntity[]>> {
    const { limit, page, q } = dto;
    const [prov, total] = await Promise.all([
      this.prisma.provinsi.findMany({
        where: {
          name: {
            contains: q,
          },
        },
        select: this.normalSelect,
        skip: limit * page,
        take: limit,
      }),
      this.prisma.provinsi.count({ where: { name: { contains: q } } }),
    ]);

    const data = plainToInstance(ProvinsiEntity, prov, {
      excludeExtraneousValues: true,
    });

    return {
      success: true,
      status: 200,
      message: 'Fetching Data Success',
      data,
      meta: {
        total,
        per_page: limit,
        current_page: page,
        last_page: Math.ceil(total / limit),
      },
    };
  }

  update() { }

  delete() { }
}
