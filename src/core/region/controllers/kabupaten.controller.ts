import { Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('kabupaten')
export class KabupatenController {
  constructor(
    private readonly query: QueryBus,
    private readonly command: CommandBus,
  ) { }

  @Get()
  index() {
    return {};
  }
}
