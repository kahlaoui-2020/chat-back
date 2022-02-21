import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DiscussionEntity } from './discussion.entity';

@Entity('user')
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid') id:string;
    @Column() lastName: string;
    @Column() firstName: string;
    @CreateDateColumn({nullable: true}) dateOfBirth: Date;
    @Column() email: string;
    @Column({select: false}) password: string;
    @Column({type: 'date'}) registrationDate: Date = new Date();
    @Column({type: 'text', nullable: true}) picture: string;
    @OneToMany(type => DiscussionEntity, room => room.user)
    rooms: DiscussionEntity[];

    async checkPassword(pass: string): Promise<boolean> {
        return await pass === this.password
    }

}
