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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserProfileResponseDto } from './dto/response/user-profile-response.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('me')
  async findCurrentUser(
    @Request() { user: { id } },
  ): Promise<UserProfileResponseDto> {
    const user = await this.usersService.findById(id);
    const { password, ...rest } = user;
    return rest;
  }

  @Patch('me')
  async updateCurrentUser(
    @Request() { user: { id } },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    const user = await this.usersService.update(id, updateUserDto);
    const { password, ...rest } = user;
    return rest;
  }
}
