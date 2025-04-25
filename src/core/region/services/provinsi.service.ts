import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetProvinsiDTO } from '../dtos/get-provinsi.dto';
import { CreateProvinsiDTO } from '../dtos/create-provinsi.dto';
import { Prisma } from '@prisma/client';
import { APIResponse } from 'src/common/interfaces/APIResponse.interface';
import { ProvinsiEntity } from '../entities/provinsi.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateProvinsiDTO } from '../dtos/update-provinsi.dto';
import { handlePrismaError } from 'src/common/prisma/prisma-error-handler';

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
      regional: {
        select: {
          id: true,
          name: true,
        },
      },
      regionalId: true,
    };
  }

  async create(dto: CreateProvinsiDTO): Promise<APIResponse<ProvinsiEntity>> {
    const { ...data } = dto;

    try {
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
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async getData(dto: GetProvinsiDTO): Promise<APIResponse<ProvinsiEntity[]>> {
    const { limit, page, q } = dto;
    const where: Prisma.ProvinsiWhereInput = {
      name: {
        contains: q,
      },
      deletedAt: null,
    };

    try {
      const [prov, total] = await Promise.all([
        this.prisma.provinsi.findMany({
          where,
          select: this.normalSelect,
          skip: limit * (page - 1),
          take: limit,
        }),
        this.prisma.provinsi.count({ where }),
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
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(
    dto: UpdateProvinsiDTO,
    id: string,
  ): Promise<APIResponse<ProvinsiEntity>> {
    try {
      const prov = await this.prisma.provinsi.update({
        select: this.normalSelect,
        data: dto,
        where: { id, deletedAt: null },
      });

      const data = plainToInstance(ProvinsiEntity, prov, {
        excludeExtraneousValues: true,
      });

      return {
        success: true,
        status: 200,
        message: 'Update Data Success',
        data,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: string): Promise<APIResponse<string>> {
    try {
      await this.prisma.provinsi.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      return {
        success: true,
        status: 200,
        message: 'Deleting Data Success',
        data: id,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
