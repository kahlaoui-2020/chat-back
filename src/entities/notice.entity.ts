import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('Notice')
export class NoticeEntity {
    @PrimaryGeneratedColumn() id:string;
    @Column('simple-json') 
    userI: {view: boolean, time: Timestamp};
    @Column('simple-json') 
    userII: {view: boolean, time: Timestamp};
}
