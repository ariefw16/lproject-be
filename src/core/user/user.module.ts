import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}
