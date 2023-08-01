import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from 'src/users/dto/signin-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninUserResponseDto } from 'src/users/dto/response/signin-user-response.dto';
import { SignupUserResponseDto } from 'src/users/dto/response/signup-user-response.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() signinUserDto: SigninUserDto): string {
    return 'signin';
  }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<SignupUserResponseDto> {
    return;
  }
}
