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
import { KabupatenService } from './services/kabupaten.service';
import { GetKabupatenHandler } from './queries/handlers/get-kabupaten.handler';
import { KabupatenController } from './controllers/kabupaten.controller';
import { CreateProvinsiHandler } from './commands/handlers/create-provinsi.handler';
import { CreateKabupatenHandler } from './commands/handlers/create-kabupaten.handler';
import { UpdateProvinsiHandler } from './commands/handlers/update-provinsi.handler';
import { DeleteProvinsiHandler } from './commands/handlers/delete-provinsi.handler';
import { DeleteKabupatenHandler } from './commands/handlers/delete-kabupaten.handler';

@Module({
  controllers: [RegionController, ProvinsiController, KabupatenController],
  providers: [
    //Service
    RegionService,
    ProvinsiService,
    KabupatenService,

    //Command Handler
    CreateRegionHandler,
    UpdateRegionHandler,
    DeleteRegionHandler,
    CreateProvinsiHandler,
    UpdateProvinsiHandler,
    DeleteProvinsiHandler,
    CreateKabupatenHandler,
    DeleteKabupatenHandler,

    //Query Handler
    GetRegionHandler,
    GetProvinsiHandler,
    GetKabupatenHandler,
  ],
  imports: [PrismaModule, CqrsModule],
})
export class RegionModule {}
