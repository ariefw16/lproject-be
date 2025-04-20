import { Controller, Get, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetKabupatenQuery } from '../queries/get-kabupaten.query';
import { GetKabupatenDTO } from '../dtos/get-kabupaten.dto';

@Controller('kabupaten')
export class KabupatenController {
  constructor(
    private readonly query: QueryBus,
    private readonly command: CommandBus,
  ) { }

  @Get()
  async index(@Query() dto: GetKabupatenDTO) {
    const data = await this.query.execute(new GetKabupatenQuery(dto));
    return data;
  }
}
