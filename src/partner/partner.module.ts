import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { VendorModule } from './vendor/vendor.module';

@Module({
  imports: [CustomerModule, VendorModule]
})
export class PartnerModule {}
