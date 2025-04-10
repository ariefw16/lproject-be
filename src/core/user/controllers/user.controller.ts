import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { GetListUserDTO } from '.././dtos/GetUserDto.dto';
import { CreateUserDTO } from '.././dtos/CreateUserDTO.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from '../queries/get-user.query';
import { CreateUserCommand } from '../commands/create-user.command';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { UpdateUserCommand } from '../commands/update-user.command';
import { DeleteUserCommand } from '../commands/delete-user.command';
import { APIResponse } from 'src/common/interfaces/APIResponse.interface';
import { UserEntity } from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Get('/')
  async getUser(@Query() q: GetListUserDTO) {
    const data = await this.queryBus.execute(new GetUserQuery(q));
    return data;
  }

  @Post('/')
  async create(@Body() dto: CreateUserDTO) {
    try {
      const data: APIResponse<UserEntity> = await this.commandBus.execute(
        new CreateUserCommand(dto),
      );
      return data;
    } catch (error) {
      // console.log(error);
      return { error };
    }
  }

  @Put(':id')
  @UsePipes()
  async update(@Body() dto: UpdateUserDTO, @Param('id') id: string) {
    try {
      const data = await this.commandBus.execute(
        new UpdateUserCommand(dto, id),
      );
      return data;
    } catch (error) {
      throw new BadRequestException(error.meta?.cause);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      const data = this.commandBus.execute(new DeleteUserCommand(id));
      return data;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.meta?.cause);
    }
  }
}
