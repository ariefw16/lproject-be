import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetKecamatanDTO } from '../dtos/get-kecamatan.dto';
import { plainToInstance } from 'class-transformer';
import { KecamatanEntity } from '../entities/kecamatan.entity';
import { APIResponse } from 'src/common/interfaces/APIResponse.interface';
import { CreateKecamatanDTO } from '../dtos/create-kecamatan.dto';
import { handlePrismaError } from 'src/common/prisma/prisma-error-handler';
import { UpdateKecamatanDTO } from '../dtos/update-kecamatan.dto';

@Injectable()
export class KecamatanService {
  private readonly normalSelect: Prisma.KecamatanSelect;
  constructor(private readonly prisma: PrismaService) {
    this.normalSelect = {
      id: true,
      name: true,
      kabupaten: {
        select: {
          id: true,
          name: true,
        },
      },
      kabupatenId: true,
      createdAt: true,
    };
  }

  async getData(dto: GetKecamatanDTO): Promise<APIResponse<KecamatanEntity[]>> {
    const { q, page: current_page, limit: per_page } = dto;
    const where: Prisma.KecamatanWhereInput = {
      name: { contains: q },
    };

    const [kecamatan, total] = await Promise.all([
      this.prisma.kecamatan.findMany({
        select: this.normalSelect,
        where,
        skip: per_page * (current_page - 1),
        take: per_page,
      }),
      this.prisma.kecamatan.count({ where }),
    ]);

    const data = plainToInstance(KecamatanEntity, kecamatan, {
      excludeExtraneousValues: true,
    });

    return {
      success: true,
      status: 200,
      message: 'Fetch data success',
      data,
      meta: {
        total,
        per_page,
        current_page,
        last_page: Math.ceil(total / per_page),
      },
    };
  }

  async create(dto: CreateKecamatanDTO): Promise<APIResponse<KecamatanEntity>> {
    try {
      const kecamatan = await this.prisma.kecamatan.create({
        data: dto,
        select: this.normalSelect,
      });

      const data = plainToInstance(KecamatanEntity, kecamatan, {
        excludeExtraneousValues: true,
      });

      return {
        success: true,
        status: 201,
        message: 'Kecamatan Created Succesfully',
        data,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(
    id: string,
    dto: UpdateKecamatanDTO,
  ): Promise<APIResponse<KecamatanEntity>> {
    const { name, kabupatenId } = dto;
    try {
      const kecamatan = await this.prisma.kecamatan.update({
        where: { id },
        data: { name, kabupatenId },
        select: this.normalSelect,
      });

      const data = plainToInstance(KecamatanEntity, kecamatan, {
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
      await this.prisma.kecamatan.update({
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
