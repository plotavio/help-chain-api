import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Requirement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('int')
  type: number;

  @Column()
  sector: string;

  @Column('datetime')
  startTime: Date;

  @Column('datetime')
  endTime: Date;

  @ManyToOne(() => User, user => user.requirement)
    user: User;

}