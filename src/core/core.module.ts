import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { RegionModule } from './region/region.module';

@Module({
  imports: [AuthModule, UserModule, RoleModule, RegionModule]
})
export class CoreModule {}
