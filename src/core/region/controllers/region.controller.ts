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
import { CreateRegionDTO } from '../dtos/create-region.dto';
import { GetRegionDTO } from '../dtos/get-region.dto';
import { UpdateRegionDTO } from '../dtos/update-region.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetRegionQuery } from '../queries/get-region.query';
import { CreateRegionCommand } from '../commands/create-region.command';
import { UpdateRegionCommand } from '../commands/update-region.command';

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
  async create(@Body() dto: CreateRegionDTO) {
    try {
      const data = await this.command.execute(new CreateRegionCommand(dto));
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRegionDTO) {
    try {
      const data = await this.command.execute(new UpdateRegionCommand(id, dto));
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return id;
  }
}
