import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1656287166024 implements MigrationInterface {
    name = 'Init1656287166024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`historical\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`response_status_code\` int NOT NULL, \`user_id\` varchar(255) NOT NULL, \`role_id\` varchar(255) NOT NULL, \`module_id\` varchar(255) NOT NULL, \`permission_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`observation\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`observation\` text NOT NULL, \`activity_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`activity\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`name_activity\` text NOT NULL, \`activity_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`fulfillment\` enum ('Yes', 'No', 'In Process') NOT NULL DEFAULT 'No', \`meeting_minutes_id\` varchar(36) NULL, \`responsible_user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attached_files\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`internal_filename\` varchar(255) NOT NULL, \`public_filename\` varchar(255) NOT NULL, \`file_location\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`meeting_minutes_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subject_agenda_item\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`item_number\` int NOT NULL, \`item_content\` text NOT NULL, \`item_development\` text NOT NULL, \`meeting_minutes_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`meeting_minutes\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`number_meeting_minutes\` int NOT NULL, \`is_regular\` tinyint NOT NULL DEFAULT 1, \`organism_committee_area_program\` varchar(255) NOT NULL, \`meeting_place\` varchar(255) NOT NULL, \`meeting_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`start_time\` varchar(255) NOT NULL, \`ending_time\` varchar(255) NOT NULL, \`produced_by_id\` varchar(36) NULL, \`reviewed_by_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`meeting_minutes_summoned\` (\`meeting_minutes_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_2f32e787c9439340da330f41c7\` (\`meeting_minutes_id\`), INDEX \`IDX_7abd124ce179b348653278158b\` (\`user_id\`), PRIMARY KEY (\`meeting_minutes_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`meeting_minutes_absent\` (\`meeting_minutes_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_efce4c254accfe1fde6108c75c\` (\`meeting_minutes_id\`), INDEX \`IDX_59a1104099022471042e09582c\` (\`user_id\`), PRIMARY KEY (\`meeting_minutes_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`meeting_minutes_guest\` (\`meeting_minutes_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_4ddd8c3cc6ac21a96a94f9a9d7\` (\`meeting_minutes_id\`), INDEX \`IDX_18915eced9e44c904899fab733\` (\`user_id\`), PRIMARY KEY (\`meeting_minutes_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`observation\` ADD CONSTRAINT \`FK_80796f7bc479246d91c2bec73ed\` FOREIGN KEY (\`activity_id\`) REFERENCES \`activity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_3a201029b6b1867b7cfb38403fe\` FOREIGN KEY (\`meeting_minutes_id\`) REFERENCES \`meeting_minutes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_16fb27f8c56d208b2f3cac1cf49\` FOREIGN KEY (\`responsible_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attached_files\` ADD CONSTRAINT \`FK_5684b106bbd1728ed7c3c14794b\` FOREIGN KEY (\`meeting_minutes_id\`) REFERENCES \`meeting_minutes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subject_agenda_item\` ADD CONSTRAINT \`FK_45c486ba2cde8e66b978d24abcc\` FOREIGN KEY (\`meeting_minutes_id\`) REFERENCES \`meeting_minutes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes\` ADD CONSTRAINT \`FK_0711faf421cc387657e2dabb5cf\` FOREIGN KEY (\`produced_by_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes\` ADD CONSTRAINT \`FK_16de00757a7c96ffd3f813ff04e\` FOREIGN KEY (\`reviewed_by_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_summoned\` ADD CONSTRAINT \`FK_2f32e787c9439340da330f41c7c\` FOREIGN KEY (\`meeting_minutes_id\`) REFERENCES \`meeting_minutes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_summoned\` ADD CONSTRAINT \`FK_7abd124ce179b348653278158b9\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_absent\` ADD CONSTRAINT \`FK_efce4c254accfe1fde6108c75ce\` FOREIGN KEY (\`meeting_minutes_id\`) REFERENCES \`meeting_minutes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_absent\` ADD CONSTRAINT \`FK_59a1104099022471042e09582c0\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_guest\` ADD CONSTRAINT \`FK_4ddd8c3cc6ac21a96a94f9a9d74\` FOREIGN KEY (\`meeting_minutes_id\`) REFERENCES \`meeting_minutes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_guest\` ADD CONSTRAINT \`FK_18915eced9e44c904899fab733c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_guest\` DROP FOREIGN KEY \`FK_18915eced9e44c904899fab733c\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_guest\` DROP FOREIGN KEY \`FK_4ddd8c3cc6ac21a96a94f9a9d74\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_absent\` DROP FOREIGN KEY \`FK_59a1104099022471042e09582c0\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_absent\` DROP FOREIGN KEY \`FK_efce4c254accfe1fde6108c75ce\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_summoned\` DROP FOREIGN KEY \`FK_7abd124ce179b348653278158b9\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_summoned\` DROP FOREIGN KEY \`FK_2f32e787c9439340da330f41c7c\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes\` DROP FOREIGN KEY \`FK_16de00757a7c96ffd3f813ff04e\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes\` DROP FOREIGN KEY \`FK_0711faf421cc387657e2dabb5cf\``);
        await queryRunner.query(`ALTER TABLE \`subject_agenda_item\` DROP FOREIGN KEY \`FK_45c486ba2cde8e66b978d24abcc\``);
        await queryRunner.query(`ALTER TABLE \`attached_files\` DROP FOREIGN KEY \`FK_5684b106bbd1728ed7c3c14794b\``);
        await queryRunner.query(`ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_16fb27f8c56d208b2f3cac1cf49\``);
        await queryRunner.query(`ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_3a201029b6b1867b7cfb38403fe\``);
        await queryRunner.query(`ALTER TABLE \`observation\` DROP FOREIGN KEY \`FK_80796f7bc479246d91c2bec73ed\``);
        await queryRunner.query(`DROP INDEX \`IDX_18915eced9e44c904899fab733\` ON \`meeting_minutes_guest\``);
        await queryRunner.query(`DROP INDEX \`IDX_4ddd8c3cc6ac21a96a94f9a9d7\` ON \`meeting_minutes_guest\``);
        await queryRunner.query(`DROP TABLE \`meeting_minutes_guest\``);
        await queryRunner.query(`DROP INDEX \`IDX_59a1104099022471042e09582c\` ON \`meeting_minutes_absent\``);
        await queryRunner.query(`DROP INDEX \`IDX_efce4c254accfe1fde6108c75c\` ON \`meeting_minutes_absent\``);
        await queryRunner.query(`DROP TABLE \`meeting_minutes_absent\``);
        await queryRunner.query(`DROP INDEX \`IDX_7abd124ce179b348653278158b\` ON \`meeting_minutes_summoned\``);
        await queryRunner.query(`DROP INDEX \`IDX_2f32e787c9439340da330f41c7\` ON \`meeting_minutes_summoned\``);
        await queryRunner.query(`DROP TABLE \`meeting_minutes_summoned\``);
        await queryRunner.query(`DROP TABLE \`meeting_minutes\``);
        await queryRunner.query(`DROP TABLE \`subject_agenda_item\``);
        await queryRunner.query(`DROP TABLE \`attached_files\``);
        await queryRunner.query(`DROP TABLE \`activity\``);
        await queryRunner.query(`DROP TABLE \`observation\``);
        await queryRunner.query(`DROP TABLE \`historical\``);
    }

}
