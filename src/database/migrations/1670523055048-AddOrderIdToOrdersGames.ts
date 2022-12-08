import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddOrderIdToOrdersGames1670523055048 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders_games',
            new TableColumn({
                name: 'order_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'orders_games',
            new TableForeignKey({
                name: 'OrdersGamesOrder',
                columnNames: ['order_id'],
                referencedTableName: 'orders',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_games', 'OrdersGamesOrder');
        await queryRunner.dropColumn('orders_games', 'order_id');
    }

}
