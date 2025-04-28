import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetKabupatenDTO } from '../dtos/get-kabupaten.dto';
import { KabupatenEntity } from '../entities/kabupaten.entity';
import { APIResponse } from 'src/common/interfaces/APIResponse.interface';
import { plainToInstance } from 'class-transformer';
import { CreateKabupatenDTO } from '../dtos/create-kabupaten.dto';
import { handlePrismaError } from 'src/common/prisma/prisma-error-handler';
import { UpdateKabupatenDTO } from '../dtos/update-kabupaten.dto';

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

  async create(dto: CreateKabupatenDTO): Promise<APIResponse<KabupatenEntity>> {
    try {
      const kab = await this.prisma.kabupaten.create({
        data: dto,
        select: this.normalSelect,
      });

      const data = plainToInstance(KabupatenEntity, kab, {
        excludeExtraneousValues: true,
      });

      return {
        success: true,
        status: 201,
        message: 'Kabupated Created Succesfully',
        data,
      };
    } catch (error) {
      handlePrismaError(error);
    }
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

  async update(
    id: string,
    dto: UpdateKabupatenDTO,
  ): Promise<APIResponse<KabupatenEntity>> {
    const { name, provinsiId } = dto;
    try {
      const kab = await this.prisma.kabupaten.update({
        where: { id },
        data: { name, provinsiId },
        select: this.normalSelect,
      });

      const data = plainToInstance(KabupatenEntity, kab, {
        excludeExtraneousValues: true,
      });

      return {
        success: true,
        status: 200,
        message: 'Data Update success',
        data,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: string): Promise<APIResponse<string>> {
    try {
      await this.prisma.kabupaten.update({
        where: { id },
        data: { deletedAt: new Date() },
        select: { id: true },
      });
      return {
        success: true,
        status: 200,
        message: 'Data Deleted success',
        data: id,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
