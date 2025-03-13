import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { PartnerModule } from './partner/partner.module';
import { WorkshopModule } from './workshop/workshop.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CoreModule,
    PartnerModule,
    WorkshopModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
