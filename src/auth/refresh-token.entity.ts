import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
})
  text: string;

  @Column()
    userId: number;


  // Many refresh tokens can belong to one user
  @ManyToOne(() => User, (user) => user.refreshTokens)
  @JoinColumn({ name: 'userId' })  // This defines the foreign key column (userId) on the refresh_tokens table
  user: User;
}

