import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetProvinsiDTO } from '../dtos/get-provinsi.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProvinsiQuery } from '../queries/get-provinsi.query';
import { CreateProvinsiDTO } from '../dtos/create-provinsi.dto';
import { CreateProvinsiCommand } from '../commands/create-provinsi.command';
import { UpdateProvinsiDTO } from '../dtos/update-provinsi.dto';
import { UpdateProvinsiCommand } from '../commands/update-provinsi.command';
import { DeleteProvinsiCommand } from '../commands/delete-provinsi.command';

@Controller('provinsi')
export class ProvinsiController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/')
  async index(@Query() dto: GetProvinsiDTO) {
    return await this.queryBus.execute(new GetProvinsiQuery(dto));
  }

  @Post('/')
  async create(@Body() dto: CreateProvinsiDTO) {
    return await this.commandBus.execute(new CreateProvinsiCommand(dto));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProvinsiDTO) {
    return await this.commandBus.execute(
      new UpdateProvinsiCommand({ id, data: dto }),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.commandBus.execute(new DeleteProvinsiCommand({ id }));
  }
}
