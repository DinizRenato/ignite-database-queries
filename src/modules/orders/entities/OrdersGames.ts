import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Game } from "../../games/entities/Game";
import { Order } from "./Order";

@Entity('orders_games')
export class OrderGames {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, order => order.order_games)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Game, game => game.order_games)
    @JoinColumn({ name: 'game_id' })
    game: Game;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
