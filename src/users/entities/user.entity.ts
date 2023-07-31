import { Entity, Column } from 'typeorm';
import { IsString, IsEmail, IsUrl, IsArray } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @IsString()
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @IsString()
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsArray()
  wishes: [];

  @Column()
  @IsArray()
  offers: [];

  @Column()
  @IsArray()
  wishlists: [];
}
