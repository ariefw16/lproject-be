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
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetKabupatenQuery } from '../queries/get-kabupaten.query';
import { GetKabupatenDTO } from '../dtos/get-kabupaten.dto';
import { CreateKabupatenDTO } from '../dtos/create-kabupaten.dto';
import { CreateKabupatenCommand } from '../commands/create-kabupaten.command';
import { UpdateKabupatenDTO } from '../dtos/update-kabupaten.dto';
import { UpdateKabupatenCommand } from '../commands/update-kabupaten.command';
import { DeleteKabupatenCommand } from '../commands/delete-kabupaten.command';

@Controller('kabupaten')
export class KabupatenController {
  constructor(
    private readonly query: QueryBus,
    private readonly command: CommandBus,
  ) {}

  @Get()
  async index(@Query() dto: GetKabupatenDTO) {
    const data = await this.query.execute(new GetKabupatenQuery(dto));
    return data;
  }

  @Post('/')
  async create(@Body() dto: CreateKabupatenDTO) {
    try {
      return await this.command.execute(
        new CreateKabupatenCommand({ data: dto }),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateKabupatenDTO) {
    try {
      return await this.command.execute(
        new UpdateKabupatenCommand({ id, data }),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.command.execute(new DeleteKabupatenCommand(id));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
