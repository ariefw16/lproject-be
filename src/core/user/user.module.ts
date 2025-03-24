import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { GetUserHandler } from './queries/handlers/get-user.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  controllers: [UserController],
  providers: [UserService, GetUserHandler],
  imports: [PrismaModule, CqrsModule],
})
export class UserModule { }
