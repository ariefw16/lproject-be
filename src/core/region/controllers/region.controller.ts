import {
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
import { CreateRegionDTO } from '../dtos/create-region.dto';
import { GetRegionDTO } from '../dtos/get-region.dto';
import { UpdateRegionDTO } from '../dtos/update-region.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetRegionQuery } from '../queries/get-region.query';
import { CreateRegionCommand } from '../commands/create-region.command';

@Controller('region')
export class RegionController {
  constructor(
    private readonly query: QueryBus,
    private readonly command: CommandBus,
  ) { }

  @Get()
  @UsePipes()
  index(@Query() dto: GetRegionDTO) {
    return this.query.execute(new GetRegionQuery(dto));
  }

  @Post()
  create(dto: CreateRegionDTO) {
    return this.command.execute(new CreateRegionCommand(dto));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRegionDTO) {
    return dto;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return id;
  }
}
