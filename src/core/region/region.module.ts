import { Module } from '@nestjs/common';
import { RegionController } from './controllers/region.controller';
import { GetRegionHandler } from './queries/handlers/get-region.handler';
import { RegionService } from './services/region.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateRegionHandler } from './commands/handlers/create-region.handler';
import { UpdateRegionHandler } from './commands/handlers/update-region.handler';
import { ProvinsiService } from './services/provinsi.service';
import { ProvinsiController } from './controllers/provinsi.controller';
import { DeleteRegionHandler } from './commands/handlers/delete-region.handler';
import { GetProvinsiHandler } from './queries/handlers/get-provinsi.handler';

@Module({
  controllers: [RegionController, ProvinsiController],
  providers: [
    //Service
    RegionService,
    ProvinsiService,

    //Command Handler
    CreateRegionHandler,
    UpdateRegionHandler,
    DeleteRegionHandler,

    //Query Handler
    GetRegionHandler,
    GetProvinsiHandler,
  ],
  imports: [PrismaModule, CqrsModule],
})
export class RegionModule {}
