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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Get('last')
  async getLastWish() {
    return await this.wishesService.findLast();
  }

  @Get('top')
  async getTopWish() {
    return await this.wishesService.findTop();
  }

  @Get(':id')
  async getWishById(@Param('id') id: number) {
    return await this.wishesService.findById(id);
  }

  @Post()
  async create(
    @Request() { user: { id } },
    @Body() createWishDto: CreateWishDto,
  ) {
    return await this.wishesService.create(id, createWishDto);
  }
}
