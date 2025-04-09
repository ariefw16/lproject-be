import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetProvinsiDTO } from '../dtos/get-provinsi.dto';
import { CreateProvinsiDTO } from '../dtos/create-provinsi.dto';

@Injectable()
export class ProvinsiService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProvinsiDTO) {
    const { ...data } = dto;
    return await this.prisma.provinsi.create({
      data,
      select: {
        id: true,
        name: true,
        regional: true,
        createdAt: true,
      },
    });
  }

  async getData(dto: GetProvinsiDTO) {
    const { limit, page, q } = dto;
    return await this.prisma.provinsi.findMany({
      where: {
        name: {
          contains: q,
        },
      },
      select: {
        id: true,
        name: true,
        regional: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: limit * page,
      take: limit,
    });
  }

  update() {}

  delete() {}
}
