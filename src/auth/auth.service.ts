import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/hash/hash.service';
import { SigninUserResponseDto } from 'src/users/dto/response/signin-user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private hashService: HashService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    /* В идеальном случае пароль обязательно должен быть захэширован */
    if (user && user.password === password) {
      /* Исключаем пароль из результата */
      const { password, ...result } = user;

      return user;
    }

    return null;
  }
}
