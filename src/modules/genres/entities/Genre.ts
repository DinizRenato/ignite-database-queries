import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Game } from "../../games/entities/Game";

@Entity('genres')
export class Genre {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    genre: string;
    @ManyToMany(() => Genre, (genre) => genre.games)
    @JoinTable()
    games: Game[];
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}
