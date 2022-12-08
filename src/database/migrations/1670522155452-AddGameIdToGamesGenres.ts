import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddGameIdToGamesGenres1670522155452 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'games_genres',
            new TableColumn({
                name: 'game_id',
                type: 'uuid',
                isNullable: true,
            }),
        );
        await queryRunner.createForeignKey(
            'games_genres',
            new TableForeignKey({
                name: 'GamesGenres',
                columnNames: ['game_id'],
                referencedTableName: 'games',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('games_genres', 'GamesGenres');
        await queryRunner.dropColumn('games_genres', 'game_id');
    }

}
