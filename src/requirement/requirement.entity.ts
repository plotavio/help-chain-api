import { ReqResponse } from 'src/reqResponse/reqResponse.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

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

  @OneToOne(() => ReqResponse)
    @JoinColumn()
    reqResponse: ReqResponse

  @ManyToOne(() => User, user => user.requirement)
    user: User;

}