import { Requirement } from 'src/requirement/requirement.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class ReqResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column('text')
  comment: string;

  @Column('datetime')
  responseTime: Date;

  @OneToOne(() => Requirement, (requirement) => requirement.reqResponse) // specify inverse side as a second parameter
  requirement: Requirement

}