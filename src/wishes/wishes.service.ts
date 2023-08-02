import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  create(createWishDto: CreateWishDto) {
    return 'This action adds a new wish';
  }
}
