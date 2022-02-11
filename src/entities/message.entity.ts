import { text } from 'stream/consumers';
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('Message')
export class MessageEntity {
    @PrimaryGeneratedColumn('increment') id:string;
    @Column('uuid') sender: string;
    @Column('uuid') discussionID: string;
    @Column({type: 'text', nullable: true}) content: string;
    @Column('timestamp') creationDate: Timestamp;
}
