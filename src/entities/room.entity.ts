import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity('room')
export class RoomEntity {
    
    @PrimaryGeneratedColumn('uuid') id:string;
    @Column('uuid') userI: string
    @Column('uuid') userII: string
    @OneToMany(type => MessageEntity, message => message.room)
    messages: MessageEntity[];

}
