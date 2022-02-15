import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('Discussion')
export class DiscussionEntity {
    @PrimaryGeneratedColumn('uuid') id:string;
    @Column('uuid') userI: string
    @Column('uuid') userII: string
    @Column('timestamp') viewI: Timestamp;
    @Column('timestamp') viewII: Timestamp;
}
