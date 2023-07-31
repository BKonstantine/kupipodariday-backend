import { Entity, Column } from 'typeorm';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';

@Entity()
export class Wish extends BaseEntity {
  @Column()
  @Length(1, 250)
  @IsString()
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  raised: number;

  @Column({ type: 'integer', default: 0 })
  @IsInt()
  copied: number;

  @Column()
  @Length(1, 1024)
  @IsString()
  description: string;

  @Column()
  @IsString()
  owner: string;

  @Column()
  @IsArray()
  offers: [];
}
