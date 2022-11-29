import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1667192743331 implements MigrationInterface {
    name = 'Init1667192743331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ac35f51a0f17e3e1fe12112603\` ON \`roles\``);
        await queryRunner.query(`CREATE TABLE \`attached_files\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`internal_filename\` varchar(255) NOT NULL, \`public_filename\` varchar(255) NOT NULL, \`file_location\` varchar(255) NOT NULL, \`mimetype\` varchar(255) NOT NULL, \`size\` int NOT NULL, \`user_id\` varchar(36) NULL, FULLTEXT INDEX \`IDX_9c7a153d6cf68320f6a94d7a10\` (\`public_filename\`), FULLTEXT INDEX \`IDX_4c3c4d0e48622f7d87d997a2a4\` (\`mimetype\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organization\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`organization_type\` enum ('ORGANIZATION', 'COMMITTEE', 'AREA', 'PROGRAM') NOT NULL DEFAULT 'COMMITTEE', \`organization_name\` varchar(255) NOT NULL, FULLTEXT INDEX \`IDX_84931e71beb141b1e131f80daa\` (\`organization_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subject_agenda_item\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`item_number\` int NOT NULL, \`item_content\` text NOT NULL, \`item_development\` text NOT NULL, \`meeting_minutes_id\` varchar(36) NULL, FULLTEXT INDEX \`IDX_8b3e22ef6559ff7c3a34b591be\` (\`item_content\`), FULLTEXT INDEX \`IDX_bc21daf229d0993ff368055898\` (\`item_development\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`meeting_minutes\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`number_meeting_minutes\` int NOT NULL, \`is_regular\` tinyint NOT NULL DEFAULT 1, \`meeting_place\` varchar(255) NOT NULL, \`meeting_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`start_time\` varchar(255) NOT NULL, \`ending_time\` varchar(255) NOT NULL, \`organization_committee_area_program\` varchar(36) NULL, \`produced_by_id\` varchar(36) NULL, \`reviewed_by_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`observation\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`observation\` text NOT NULL, \`activity_id\` varchar(36) NULL, FULLTEXT INDEX \`IDX_9b318438cd0f0adaaa079b1821\` (\`observation\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`activity\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`name_activity\` text NOT NULL, \`activity_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`fulfillment\` enum ('Yes', 'No', 'In Process') NOT NULL DEFAULT 'No', \`meeting_minutes_id\` varchar(36) NULL, FULLTEXT INDEX \`IDX_f329d79279e4a52a691f1bd94a\` (\`name_activity\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`historical\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`response_status_code\` int NOT NULL, \`user_id\` varchar(255) NOT NULL, \`role_id\` varchar(255) NOT NULL, \`module_id\` varchar(255) NOT NULL, \`permission_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`meeting_minutes_summoned\` (\`meeting_minutes_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_2f32e787c9439340da330f41c7\` (\`meeting_minutes_id\`), INDEX \`IDX_7abd124ce179b348653278158b\` (\`user_id\`), PRIMARY KEY (\`meeting_minutes_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`meeting_minutes_absent\` (\`meeting_minutes_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_efce4c254accfe1fde6108c75c\` (\`meeting_minutes_id\`), INDEX \`IDX_59a1104099022471042e09582c\` (\`user_id\`), PRIMARY KEY (\`meeting_minutes_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`meeting_minutes_guest\` (\`meeting_minutes_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_4ddd8c3cc6ac21a96a94f9a9d7\` (\`meeting_minutes_id\`), INDEX \`IDX_18915eced9e44c904899fab733\` (\`user_id\`), PRIMARY KEY (\`meeting_minutes_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`meeting_minutes_attached_files\` (\`meeting_minutes_id\` varchar(36) NOT NULL, \`attached_file_id\` varchar(36) NOT NULL, INDEX \`IDX_40be30441a0203a33df70efca5\` (\`meeting_minutes_id\`), INDEX \`IDX_55c7a73d30f891ea6b48fc9f1d\` (\`attached_file_id\`), PRIMARY KEY (\`meeting_minutes_id\`, \`attached_file_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`activity_user\` (\`activity_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_2ddc32daa83050c92d30fc5951\` (\`activity_id\`), INDEX \`IDX_f58708cacdf92d69494588003b\` (\`user_id\`), PRIMARY KEY (\`activity_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`modules\` ADD UNIQUE INDEX \`IDX_e10bfbd4b8f0bdc8f363ab5757\` (\`module_name\`)`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD UNIQUE INDEX \`IDX_b990eff1fc3540798960d80e45\` (\`permission_name\`)`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD UNIQUE INDEX \`IDX_ac35f51a0f17e3e1fe12112603\` (\`role_name\`)`);
        await queryRunner.query(`ALTER TABLE \`attached_files\` ADD CONSTRAINT \`FK_0244f65764feaf2860e0b078c46\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subject_agenda_item\` ADD CONSTRAINT \`FK_45c486ba2cde8e66b978d24abcc\` FOREIGN KEY (\`meeting_minutes_id\`) REFERENCES \`meeting_minutes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes\` ADD CONSTRAINT \`FK_017a668d0522679f4c190205275\` FOREIGN KEY (\`organization_committee_area_program\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes\` ADD CONSTRAINT \`FK_0711faf421cc387657e2dabb5cf\` FOREIGN KEY (\`produced_by_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes\` ADD CONSTRAINT \`FK_16de00757a7c96ffd3f813ff04e\` FOREIGN KEY (\`reviewed_by_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`observation\` ADD CONSTRAINT \`FK_80796f7bc479246d91c2bec73ed\` FOREIGN KEY (\`activity_id\`) REFERENCES \`activity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_3a201029b6b1867b7cfb38403fe\` FOREIGN KEY (\`meeting_minutes_id\`) REFERENCES \`meeting_minutes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_summoned\` ADD CONSTRAINT \`FK_2f32e787c9439340da330f41c7c\` FOREIGN KEY (\`meeting_minutes_id\`) REFERENCES \`meeting_minutes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_summoned\` ADD CONSTRAINT \`FK_7abd124ce179b348653278158b9\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_absent\` ADD CONSTRAINT \`FK_efce4c254accfe1fde6108c75ce\` FOREIGN KEY (\`meeting_minutes_id\`) REFERENCES \`meeting_minutes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_absent\` ADD CONSTRAINT \`FK_59a1104099022471042e09582c0\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_guest\` ADD CONSTRAINT \`FK_4ddd8c3cc6ac21a96a94f9a9d74\` FOREIGN KEY (\`meeting_minutes_id\`) REFERENCES \`meeting_minutes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_guest\` ADD CONSTRAINT \`FK_18915eced9e44c904899fab733c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_attached_files\` ADD CONSTRAINT \`FK_40be30441a0203a33df70efca54\` FOREIGN KEY (\`meeting_minutes_id\`) REFERENCES \`meeting_minutes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_attached_files\` ADD CONSTRAINT \`FK_55c7a73d30f891ea6b48fc9f1d3\` FOREIGN KEY (\`attached_file_id\`) REFERENCES \`attached_files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_user\` ADD CONSTRAINT \`FK_2ddc32daa83050c92d30fc59513\` FOREIGN KEY (\`activity_id\`) REFERENCES \`activity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`activity_user\` ADD CONSTRAINT \`FK_f58708cacdf92d69494588003be\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_user\` DROP FOREIGN KEY \`FK_f58708cacdf92d69494588003be\``);
        await queryRunner.query(`ALTER TABLE \`activity_user\` DROP FOREIGN KEY \`FK_2ddc32daa83050c92d30fc59513\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_attached_files\` DROP FOREIGN KEY \`FK_55c7a73d30f891ea6b48fc9f1d3\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_attached_files\` DROP FOREIGN KEY \`FK_40be30441a0203a33df70efca54\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_guest\` DROP FOREIGN KEY \`FK_18915eced9e44c904899fab733c\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_guest\` DROP FOREIGN KEY \`FK_4ddd8c3cc6ac21a96a94f9a9d74\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_absent\` DROP FOREIGN KEY \`FK_59a1104099022471042e09582c0\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_absent\` DROP FOREIGN KEY \`FK_efce4c254accfe1fde6108c75ce\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_summoned\` DROP FOREIGN KEY \`FK_7abd124ce179b348653278158b9\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes_summoned\` DROP FOREIGN KEY \`FK_2f32e787c9439340da330f41c7c\``);
        await queryRunner.query(`ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_3a201029b6b1867b7cfb38403fe\``);
        await queryRunner.query(`ALTER TABLE \`observation\` DROP FOREIGN KEY \`FK_80796f7bc479246d91c2bec73ed\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes\` DROP FOREIGN KEY \`FK_16de00757a7c96ffd3f813ff04e\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes\` DROP FOREIGN KEY \`FK_0711faf421cc387657e2dabb5cf\``);
        await queryRunner.query(`ALTER TABLE \`meeting_minutes\` DROP FOREIGN KEY \`FK_017a668d0522679f4c190205275\``);
        await queryRunner.query(`ALTER TABLE \`subject_agenda_item\` DROP FOREIGN KEY \`FK_45c486ba2cde8e66b978d24abcc\``);
        await queryRunner.query(`ALTER TABLE \`attached_files\` DROP FOREIGN KEY \`FK_0244f65764feaf2860e0b078c46\``);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP INDEX \`IDX_ac35f51a0f17e3e1fe12112603\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP INDEX \`IDX_b990eff1fc3540798960d80e45\``);
        await queryRunner.query(`ALTER TABLE \`modules\` DROP INDEX \`IDX_e10bfbd4b8f0bdc8f363ab5757\``);
        await queryRunner.query(`DROP INDEX \`IDX_f58708cacdf92d69494588003b\` ON \`activity_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_2ddc32daa83050c92d30fc5951\` ON \`activity_user\``);
        await queryRunner.query(`DROP TABLE \`activity_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_55c7a73d30f891ea6b48fc9f1d\` ON \`meeting_minutes_attached_files\``);
        await queryRunner.query(`DROP INDEX \`IDX_40be30441a0203a33df70efca5\` ON \`meeting_minutes_attached_files\``);
        await queryRunner.query(`DROP TABLE \`meeting_minutes_attached_files\``);
        await queryRunner.query(`DROP INDEX \`IDX_18915eced9e44c904899fab733\` ON \`meeting_minutes_guest\``);
        await queryRunner.query(`DROP INDEX \`IDX_4ddd8c3cc6ac21a96a94f9a9d7\` ON \`meeting_minutes_guest\``);
        await queryRunner.query(`DROP TABLE \`meeting_minutes_guest\``);
        await queryRunner.query(`DROP INDEX \`IDX_59a1104099022471042e09582c\` ON \`meeting_minutes_absent\``);
        await queryRunner.query(`DROP INDEX \`IDX_efce4c254accfe1fde6108c75c\` ON \`meeting_minutes_absent\``);
        await queryRunner.query(`DROP TABLE \`meeting_minutes_absent\``);
        await queryRunner.query(`DROP INDEX \`IDX_7abd124ce179b348653278158b\` ON \`meeting_minutes_summoned\``);
        await queryRunner.query(`DROP INDEX \`IDX_2f32e787c9439340da330f41c7\` ON \`meeting_minutes_summoned\``);
        await queryRunner.query(`DROP TABLE \`meeting_minutes_summoned\``);
        await queryRunner.query(`DROP TABLE \`historical\``);
        await queryRunner.query(`DROP INDEX \`IDX_f329d79279e4a52a691f1bd94a\` ON \`activity\``);
        await queryRunner.query(`DROP TABLE \`activity\``);
        await queryRunner.query(`DROP INDEX \`IDX_9b318438cd0f0adaaa079b1821\` ON \`observation\``);
        await queryRunner.query(`DROP TABLE \`observation\``);
        await queryRunner.query(`DROP TABLE \`meeting_minutes\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc21daf229d0993ff368055898\` ON \`subject_agenda_item\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b3e22ef6559ff7c3a34b591be\` ON \`subject_agenda_item\``);
        await queryRunner.query(`DROP TABLE \`subject_agenda_item\``);
        await queryRunner.query(`DROP INDEX \`IDX_84931e71beb141b1e131f80daa\` ON \`organization\``);
        await queryRunner.query(`DROP TABLE \`organization\``);
        await queryRunner.query(`DROP INDEX \`IDX_4c3c4d0e48622f7d87d997a2a4\` ON \`attached_files\``);
        await queryRunner.query(`DROP INDEX \`IDX_9c7a153d6cf68320f6a94d7a10\` ON \`attached_files\``);
        await queryRunner.query(`DROP TABLE \`attached_files\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ac35f51a0f17e3e1fe12112603\` ON \`roles\` (\`role_name\`)`);
    }

}
