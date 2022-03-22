import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid') id:string;
    @Column() lastName: string;
    @Column() firstName: string;
    @Column({nullable: true}) dateOfBirth: Date;
    @Column({unique: true}) email: string;
    @Column({select: false}) password: string;
    @Column({type: 'date'}) registrationDate: Date = new Date();
    @Column({type: 'text', nullable: true}) picture: string;
    @Column({type: 'bool', default: false}) active: boolean;
    
    async checkPassword(pass: string): Promise<boolean> {
        return await pass === this.password
    }

}
