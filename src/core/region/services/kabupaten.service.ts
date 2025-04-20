import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetKabupatenDTO } from '../dtos/get-kabupaten.dto';
import { KabupatenEntity } from '../entities/kabupaten.entity';
import { APIResponse } from 'src/common/interfaces/APIResponse.interface';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class KabupatenService {
  private readonly normalSelect: Prisma.KabupatenSelect;
  constructor(private readonly prisma: PrismaService) {
    this.normalSelect = {
      id: true,
      name: true,
      provinsi: {
        select: {
          id: true,
          name: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    };
  }

  async create() {
    return;
  }

  async getData(dto: GetKabupatenDTO): Promise<APIResponse<KabupatenEntity[]>> {
    const { q, page: current_page, limit: per_page } = dto;
    const where: Prisma.KabupatenWhereInput = {
      name: { contains: q },
    };
    const [kab, total] = await Promise.all([
      this.prisma.kabupaten.findMany({
        where,
        select: this.normalSelect,
        skip: per_page * current_page,
        take: per_page,
      }),
      this.prisma.kabupaten.count({ where }),
    ]);

    const data = plainToInstance(KabupatenEntity, kab, {
      excludeExtraneousValues: true,
    });

    return {
      success: true,
      status: 200,
      message: 'Data Fetch Success',
      data,
      meta: {
        total,
        current_page,
        per_page,
        last_page: Math.ceil(total / per_page),
      },
    };
  }

  async update() {
    return;
  }

  async delete(id: string) {
    return { id };
  }
}
