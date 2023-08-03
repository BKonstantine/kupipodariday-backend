import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    private usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async create(ownerId: number, createWishDto: CreateWishDto) {
    const { password, ...rest } = await this.usersService.findById(ownerId);
    return await this.wishRepository.save({ ...createWishDto, owner: rest });
  }

  async update(id: number, updateData: any) {
    await this.wishRepository.update(id, updateData);
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
      relations: ['owner', 'offers', 'offers.user'],
    });
    return wish;
  }

  async delete(userId: number, wishId: number) {
    const wish = await this.findById(wishId);
    if (userId !== wish.owner.id) {
      throw new ServerException(ErrorCode.Forbidden);
    }
    return await this.wishRepository.delete(wishId);
  }

  async copy(userId: number, wishId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { id, createdAt, updatedAt, owner, ...wish } = await this.findById(
        wishId,
      );
      const copiedWish = await this.create(userId, wish);
      await this.wishRepository.update(wishId, {
        copied: copiedWish.copied + 1,
      });
      await queryRunner.commitTransaction();
      return copiedWish;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
