import { Module } from '@nestjs/common';
import { RegionController } from './controllers/region.controller';
import { GetRegionHandler } from './queries/handlers/get-region.handler';
import { RegionService } from './services/region.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateRegionHandler } from './commands/handlers/create-region.handler';
import { UpdateRegionHandler } from './commands/handlers/update-region.handler';

@Module({
  controllers: [RegionController],
  providers: [
    GetRegionHandler,
    RegionService,
    CreateRegionHandler,
    UpdateRegionHandler,
    GetRegionHandler,
  ],
  imports: [PrismaModule, CqrsModule],
})
export class RegionModule { }
