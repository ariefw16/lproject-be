import { Module } from '@nestjs/common';
import { RegionController } from './controllers/region.controller';
import { GetRegionHandler } from './queries/handlers/get-region.handler';
import { RegionService } from './services/region.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  controllers: [RegionController],
  providers: [GetRegionHandler, RegionService],
  imports: [PrismaModule, CqrsModule],
})
export class RegionModule { }
