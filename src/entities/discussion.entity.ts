import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Discussion')
export class DiscussionEntity {
    @PrimaryGeneratedColumn('uuid') id:string;
    @Column('uuid') userI: string
    @Column('uuid') userII: string
}
