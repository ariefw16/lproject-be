import {
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
  create() {
    return;
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return id;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return id;
  }
}
