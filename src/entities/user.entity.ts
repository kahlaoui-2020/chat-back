import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid') id:string;
    @Column() lastName: string;
    @Column() firstName: string;
    @Column() dateOfBirth: Date;
    @Column() email: string;
    @Column() password: string;
    @Column() registrationDate: Date;
    @Column({type: 'text', nullable: true}) picture: string;

}
