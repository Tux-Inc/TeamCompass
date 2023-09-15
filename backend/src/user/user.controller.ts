import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CompanyAuthGuard } from '../company-auth/company-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(CompanyAuthGuard)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/distant/:distant_id')
  @UseGuards(CompanyAuthGuard)
  getUserByDistantId(@Param() params: any) {
    return this.userService.getUserByDistantId(params.distant_id);
  }
}
