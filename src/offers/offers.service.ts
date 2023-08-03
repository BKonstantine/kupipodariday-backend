import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  create(createOfferDto: CreateOfferDto) {
    return 'This action adds a new offer';
  }
}
