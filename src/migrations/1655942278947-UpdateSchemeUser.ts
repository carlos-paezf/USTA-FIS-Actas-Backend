import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchemeUser1655942278947 implements MigrationInterface {
    name = 'UpdateSchemeUser1655942278947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`position\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`position\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`position\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`position\` enum ('Decano', 'Desarrollador', 'Administrativo', 'Docente', 'Estudiante', 'Invitado') NOT NULL DEFAULT 'Docente'`);
    }

}
