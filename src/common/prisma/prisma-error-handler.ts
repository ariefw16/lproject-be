import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function handlePrismaError(error: any): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2000':
        throw new BadRequestException('Value too long for column.');
      case 'P2002':
        throw new ConflictException('Duplicate key violation.');
      case 'P2003':
        throw new BadRequestException('Foreign key constraint failed.');
      case 'P2025':
        throw new NotFoundException('Record not found.');
      default:
        throw new BadRequestException(`Prisma error: ${error.message}`);
    }
  }

  throw new InternalServerErrorException(error.message || 'Unexpected error');
}
