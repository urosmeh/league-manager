import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsString } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  firstName: string;

  @Column()
  @IsString()
  lastName: string;
}
