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

@Controller('region')
export class RegionController {
  constructor() { }

  @Get()
  @UsePipes()
  index(@Query() dto: GetRegionDTO) {
    return dto;
  }

  @Post()
  create(dto: CreateRegionDTO) {
    return dto;
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
