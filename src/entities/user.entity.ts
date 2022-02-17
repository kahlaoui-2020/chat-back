import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid') id:string;
    @Column() lastName: string;
    @Column() firstName: string;
    @CreateDateColumn({nullable: true}) dateOfBirth: Date;
    @Column() email: string;
    @Column() password: string;
    @Column({type: 'date'}) registrationDate: Date = new Date();
    @Column({type: 'text', nullable: true}) picture: string;

    async checkPassword(pass: string): Promise<boolean> {
        return await pass === this.password
    }

}
