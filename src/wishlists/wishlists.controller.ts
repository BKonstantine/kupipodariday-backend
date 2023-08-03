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

import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  async getAll() {
    return await this.wishlistsService.findAll();
  }

  @Post()
  async create(
    @Request() { user: { id } },
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    return await this.wishlistsService.create(id, createWishlistDto);
  }
}
