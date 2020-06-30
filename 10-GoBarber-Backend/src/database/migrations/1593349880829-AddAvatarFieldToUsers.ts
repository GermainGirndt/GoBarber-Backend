import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// for performance purpouses,
// we shouldn't save images to the databank, but it's address

// we're using isNullable: true because there're still users in the db
export default class AddAvatarFieldToUsers1593349880829
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar');
    }
}
