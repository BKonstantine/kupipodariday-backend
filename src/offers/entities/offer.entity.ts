import { Entity, Column } from 'typeorm';
import { IsBoolean, IsNumber } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';

@Entity()
export class Offer extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  amount: number;

  @Column()
  @IsBoolean()
  hidden: string;

  @Column()
  user: string;

  @Column()
  item: string;
}
