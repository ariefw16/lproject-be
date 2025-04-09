import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetRegionDTO } from '../dtos/get-region.dto';
import { Prisma } from '@prisma/client';
import { CreateRegionDTO } from '../dtos/create-region.dto';
import { UpdateRegionDTO } from '../dtos/update-region.dto';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  async getData(dto: GetRegionDTO) {
    const { page, q, limit } = dto;
    const where: Prisma.RegionalWhereInput = {
      name: { contains: q },
      deletedAt: null,
    };
    const [data, count] = await Promise.all([
      this.prisma.regional.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where,
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.regional.count({ where }),
    ]);

    return {};
  }

  async create(dto: CreateRegionDTO) {
    return await this.prisma.regional.create({
      data: { ...dto },
      select: {
        id: true,
        name: true,
        updatedAt: true,
        createdAt: true,
      },
    });
  }

  async update(dto: UpdateRegionDTO, id: string) {
    return await this.prisma.regional.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        name: true,
        updatedAt: true,
        createdAt: true,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.regional.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: { id: true },
    });
  }
}
