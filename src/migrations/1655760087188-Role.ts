import { MigrationInterface, QueryRunner } from "typeorm";

export class Role1655760087188 implements MigrationInterface {
    name = 'Role1655760087188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles\` ADD UNIQUE INDEX \`IDX_ac35f51a0f17e3e1fe12112603\` (\`role_name\`)`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`role_description\` \`role_description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`role_description\` \`role_description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP INDEX \`IDX_ac35f51a0f17e3e1fe12112603\``);
    }

}
