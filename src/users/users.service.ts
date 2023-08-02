import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from 'src/hash/hash.service';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userWithHash =
        await this.hashService.getUserWithHash<CreateUserDto>(createUserDto);
      const user = await this.usersRepository.save(userWithHash);
      const { password, ...rest } = user;
      return rest;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new ServerException(ErrorCode.UserAlreadyExists);
      }
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const newUserData = updateUserDto.hasOwnProperty('password')
      ? await this.hashService.getUserWithHash<UpdateUserDto>(updateUserDto)
      : updateUserDto;
    const user = await this.usersRepository.update(id, newUserData);
    if (user.affected === 0) {
      throw new ServerException(ErrorCode.ValidationError);
    }
    return this.findById(id);
  }

  async findWishes(id: number): Promise<Wish[]> {
    const { wishes } = await this.usersRepository.findOne({
      where: { id },
      relations: ['wishes', 'wishes.owner'],
    });

    return wishes;
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }
}
