import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetRegionDTO } from '../dtos/get-region.dto';
import { Prisma } from '@prisma/client';
import { CreateRegionDTO } from '../dtos/create-region.dto';
import { UpdateRegionDTO } from '../dtos/update-region.dto';
import { APIResponse } from 'src/common/interfaces/APIResponse.interface';
import { RegionEntity } from '../entities/region.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RegionService {
  private readonly selectNormal: Prisma.RegionalSelect;
  constructor(private readonly prisma: PrismaService) {
    this.selectNormal = {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  async getData(dto: GetRegionDTO): Promise<APIResponse<RegionEntity[]>> {
    const { page, q, limit } = dto;
    const where: Prisma.RegionalWhereInput = {
      name: { contains: q },
      deletedAt: null,
    };
    const [region, total] = await Promise.all([
      this.prisma.regional.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where,
        select: this.selectNormal,
      }),
      this.prisma.regional.count({ where }),
    ]);

    const data = plainToInstance(RegionEntity, region, {
      excludeExtraneousValues: true,
    });

    return {
      success: true,
      status: 200,
      message: 'Fetching Data Success',
      data,
      meta: {
        total,
        current_page: page,
        per_page: limit,
        last_page: Math.ceil(total / limit),
      },
    };
  }

  async create(dto: CreateRegionDTO): Promise<APIResponse<RegionEntity>> {
    const region = await this.prisma.regional.create({
      data: { ...dto },
      select: this.selectNormal,
    });

    const data = plainToInstance(RegionEntity, region, {
      excludeExtraneousValues: true,
    });

    return {
      success: true,
      status: 201,
      message: 'Region Created Successfully',
      data,
    };
  }

  async update(
    dto: UpdateRegionDTO,
    id: string,
  ): Promise<APIResponse<RegionEntity>> {
    const region = await this.prisma.regional.update({
      where: { id },
      data: dto,
      select: this.selectNormal,
    });

    const data = plainToInstance(RegionEntity, region, {
      excludeExtraneousValues: true,
    });

    return {
      success: true,
      status: 200,
      message: 'Region Updated Successfully',
      data,
    };
  }

  async delete(id: string): Promise<APIResponse<string>> {
    await this.prisma.regional.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: { id: true },
    });

    return {
      success: true,
      status: 200,
      message: 'Region Deleted Successfully',
      data: id,
    };
  }
}
