import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class HashService {
  async getHash(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async getUserWithHash<T extends { password?: string }>(
    createUserDto: T,
  ): Promise<Omit<T, 'password'> & { password: string }> {
    const { password, ...rest } = createUserDto;
    const hashPassword = await this.getHash(password);
    return {
      ...rest,
      password: hashPassword,
    };
  }
  /* async getUserWithHash(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const { password, ...rest } = createUserDto;
    const hashPassword = await this.getHash(password);
    return {
      ...rest,
      password: hashPassword,
    };
  } */

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
