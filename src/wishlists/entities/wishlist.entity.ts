import { Entity, Column } from 'typeorm';
import { IsArray, IsString, IsUrl, Length } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';

@Entity()
export class Wishlist extends BaseEntity {
  @Column()
  @Length(1, 250)
  @IsString()
  name: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  owner: string;

  @Column()
  @IsArray()
  items: [];
}
