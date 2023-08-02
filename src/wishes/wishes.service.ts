import { Injectable } from '@nestjs/common';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    private usersService: UsersService,
  ) {}

  async create(ownerId: number, createWishDto: CreateWishDto) {
    const { password, ...rest } = await this.usersService.findById(ownerId);
    return await this.wishRepository.save({ ...createWishDto, owner: rest });
  }

  async findLast() {
    return await this.wishRepository.find({
      order: { createdAt: 'desc' },
      take: 40,
    });
  }

  async findTop() {
    return await this.wishRepository.find({
      order: { copied: 'desc' },
      take: 20,
    });
  }

  async findById(id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    return wish;
  }
}
