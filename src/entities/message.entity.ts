import { text } from 'stream/consumers';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { DiscussionEntity } from './discussion.entity';

@Entity('message')
export class MessageEntity {
    @PrimaryGeneratedColumn('increment') id:string;
    @Column('uuid') sender: string;
    @Column('uuid') discussionID: string;
    @Column({type: 'text', nullable: true}) content: string;
    @Column('timestamp') creationDate: Timestamp;
    @ManyToOne(type => DiscussionEntity, room => room.messages)
    room:DiscussionEntity;
}
