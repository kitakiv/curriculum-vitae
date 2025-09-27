import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Slider {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  sliderTitle: string;
  @Column()
  sliderText: string;
  @Column()
  sliderImage: string;
}
