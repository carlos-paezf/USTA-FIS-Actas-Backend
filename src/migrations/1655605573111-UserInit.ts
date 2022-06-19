import { MigrationInterface, QueryRunner } from "typeorm";

export class UserInit1655605573111 implements MigrationInterface {
    name = 'UserInit1655605573111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`username\` varchar(15) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('DEAN', 'ADMINISTRATIVE', 'PROFESSOR', 'USER', 'DEVELOPER') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
