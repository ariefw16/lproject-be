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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetKecamatanQuery } from '../queries/get-kecamatan.query';
import { GetKecamatanDTO } from '../dtos/get-kecamatan.dto';
import { CreateKecamatanDTO } from '../dtos/create-kecamatan.dto';
import { CreateKecamatanCommand } from '../commands/create-kecamatan.command';
import { UpdateKecamatanDTO } from '../dtos/update-kecamatan.dto';
import { UpdateKecamatanCommand } from '../commands/update-kecamatan.command';
import { DeleteKecamatanCommand } from '../commands/delete-kecamatan.command';

@Controller('kecamatan')
export class KecamatanController {
  constructor(
    private readonly query: QueryBus,
    private readonly command: CommandBus,
  ) { }

  @Get()
  async index(@Query() dto: GetKecamatanDTO) {
    return await this.query.execute(new GetKecamatanQuery(dto));
  }

  @Post()
  async create(@Body() dto: CreateKecamatanDTO) {
    return await this.command.execute(
      new CreateKecamatanCommand({ data: dto }),
    );
  }

  @Put(':id')
  async update(@Body() dto: UpdateKecamatanDTO, @Param('id') id: string) {
    return await this.command.execute(
      new UpdateKecamatanCommand({ id, data: dto }),
    );
  }

  @Delete('id')
  async delete(@Param('id') id: string) {
    return await this.command.execute(new DeleteKecamatanCommand({ id }));
  }
}
