import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddGenreIdToGamesGenres1670522332580 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'games_genres',
            new TableColumn({
                name: 'genre_id',
                type: 'uuid',
                isNullable: true,
            }),
        );
        await queryRunner.createForeignKey(
            'games_genres',
            new TableForeignKey({
                name: 'GenresGames',
                columnNames: ['genre_id'],
                referencedTableName: 'genres',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('games_genres', 'GenresGames');
        await queryRunner.dropColumn('games_genres', 'genre_id');
    }

}
