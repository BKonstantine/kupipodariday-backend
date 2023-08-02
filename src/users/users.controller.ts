import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserProfileResponseDto } from './dto/response/user-profile-response.dto';
import { PasswordInterceptor } from 'src/interceptors/password.interceptor';
import { InvalidDataExceptionFilter } from 'src/filter/invalid-data-exception.filter';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseInterceptors(PasswordInterceptor)
  async findCurrentUser(@Request() { user: { id } }) {
    return await this.usersService.findById(id);
  }

  @Get('me/wishes')
  async findCurrentUserWishes(@Request() { user: { id } }) {
    return await this.usersService.findWishes(id);
  }

  @Get(':username')
  async findUser(@Param() username: string) {
    return await this.usersService.findByUsername(username);
  }

  @Get(':username/wishes')
  async findUserWishes(@Param() username: string) {
    const { id } = await this.usersService.findByUsername(username);
    return await this.usersService.findWishes(id);
  }

  @Patch('me')
  @UseFilters(InvalidDataExceptionFilter)
  @UseInterceptors(PasswordInterceptor)
  async updateCurrentUser(
    @Request() { user: { id } },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }
}
