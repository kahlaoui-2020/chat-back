import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomEntity } from './room.entity';

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
    @OneToMany(type => UserEntity, user => user.id)
    friends: UserEntity[];
    
    async checkPassword(pass: string): Promise<boolean> {
        return await pass === this.password
    }

}
