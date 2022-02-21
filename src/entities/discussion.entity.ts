import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.entity';

@Entity('discussion')
export class DiscussionEntity {
    @PrimaryGeneratedColumn('uuid') id:string;
    @Column('uuid') userI: string
    @Column('uuid') userII: string
    @Column('timestamp', {nullable: true}) viewI: Timestamp;
    @Column('timestamp', {nullable: true}) viewII: Timestamp;
    @ManyToOne(type => UserEntity, user => user.rooms)
    user: UserEntity;
    @OneToMany(type => MessageEntity, message => message.room)
    messages: MessageEntity[];

}
