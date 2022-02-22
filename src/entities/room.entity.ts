import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.entity';

@Entity('room')
export class RoomEntity {
    @PrimaryGeneratedColumn('uuid') id:string;
    @Column('uuid') userI: string
    @Column('uuid') userII: string
    @Column('timestamp', {nullable: true}) viewI: Timestamp;
    @Column('timestamp', {nullable: true}) viewII: Timestamp;
    @OneToMany(type => MessageEntity, message => message.room)
    messages: MessageEntity[];

}
