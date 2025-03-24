import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { GetUserHandler } from './queries/handlers/get-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateUserHandler } from './commands/handlers/update-user.handler';

@Module({
  controllers: [UserController],
  providers: [UserService, GetUserHandler, UpdateUserHandler],
  imports: [PrismaModule, CqrsModule],
})
export class UserModule { }
