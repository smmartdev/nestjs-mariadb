// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { RefreshToken } from '../auth/refresh-token.entity';
import { Cart } from 'src/carts/cart.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

    @Column({
      unique: true
    })
    username: string;

    @Column()
    password: string;


    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false
      })
      createdAt: Date;

      @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        nullable: false
      })
      updatedAt: Date;


      @Column({ type: 'enum', enum: Role, default: Role.USER })
      role: Role;

  // One User can have many refreshTokens
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.userId)
  refreshTokens: RefreshToken[];


    @OneToOne(() => Cart, cart => cart.user, { cascade: true })
    cart: Cart;

}

