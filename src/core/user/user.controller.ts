import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetListUserDTO } from './dtos/GetUserDto.dto';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/CreateUserDTO.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('/')
  getUser(@Query() q: GetListUserDTO) {
    return this.userService.getUser(q);
  }

  @Post('/')
  create(@Body() dto: CreateUserDTO) {
    try {
      const data = this.userService.create(dto);
      return data;
    } catch (error) { }
  }
}
