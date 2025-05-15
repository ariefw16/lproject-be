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
import { UpdateKabupatenHandler } from './commands/handlers/update-kabupaten.handler';
import { KecamatanController } from './controllers/kecamatan.controller';
import { GetKecamatanHandler } from './queries/handlers/get-kecamatan.handler';
import { KecamatanService } from './services/kecamatan.service';
import { CreateKecamatanHandler } from './commands/handlers/create-kecamatan.handler';
import { UpdateKecamatanHandler } from './commands/handlers/update-kecamatan.handler';
import { DeleteKecamatanHandler } from './commands/handlers/delete-kecamatan.handler';

@Module({
  controllers: [
    RegionController,
    ProvinsiController,
    KabupatenController,
    KecamatanController,
  ],
  providers: [
    //Service
    RegionService,
    ProvinsiService,
    KabupatenService,
    KecamatanService,

    //Command Handler
    CreateRegionHandler,
    CreateProvinsiHandler,
    CreateKabupatenHandler,
    CreateKecamatanHandler,
    UpdateRegionHandler,
    UpdateProvinsiHandler,
    UpdateKabupatenHandler,
    UpdateKecamatanHandler,
    DeleteRegionHandler,
    DeleteProvinsiHandler,
    DeleteKabupatenHandler,
    DeleteKecamatanHandler,

    //Query Handler
    GetRegionHandler,
    GetProvinsiHandler,
    GetKabupatenHandler,
    GetKecamatanHandler,
  ],
  imports: [PrismaModule, CqrsModule],
})
export class RegionModule { }
