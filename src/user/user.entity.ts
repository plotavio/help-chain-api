import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Requirement } from 'src/requirement/requirement.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  country: string;

  @Column()
  department: string;

  @Column('int')
  type: number;

  @OneToMany(() => Requirement, requirement => requirement.user)
  requirement: Requirement[];
}