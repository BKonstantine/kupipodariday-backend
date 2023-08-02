import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PasswordUserInterceptor } from 'src/interceptors/password-user.interceptor';
import { PasswordWishInterceptor } from 'src/interceptors/password-wish.interceptor';
import { InvalidDataExceptionFilter } from 'src/filter/invalid-data-exception.filter';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(PasswordUserInterceptor)
  @Get('me')
  async findCurrentUser(@Request() { user: { id } }) {
    return await this.usersService.findById(id);
  }

  @UseInterceptors(PasswordWishInterceptor)
  @Get('me/wishes')
  async findCurrentUserWishes(@Request() { user: { id } }) {
    return await this.usersService.findWishes(id);
  }

  @UseInterceptors(PasswordUserInterceptor)
  @Get(':username')
  async findUser(@Param('username') username: string) {
    return await this.usersService.findByUsername(username);
  }

  @UseInterceptors(PasswordWishInterceptor)
  @Get(':username/wishes')
  async findUserWishes(@Param('username') username: string) {
    const { id } = await this.usersService.findByUsername(username);
    return await this.usersService.findWishes(id);
  }

  @Patch('me')
  @UseFilters(InvalidDataExceptionFilter)
  @UseInterceptors(PasswordUserInterceptor)
  async updateCurrentUser(
    @Request() { user: { id } },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }
}
