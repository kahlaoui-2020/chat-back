import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity('friends')
export class FriendsEntity {

    @PrimaryColumn('uuid') userI: string
    @PrimaryColumn('uuid') userII: string
    @Column('timestamp', {nullable: true}) viewI: Timestamp;
    @Column('timestamp', {nullable: true}) viewII: Timestamp;
    @OneToMany(type => MessageEntity, message => message.room)
    messages: MessageEntity[];
}
