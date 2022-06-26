CREATE TABLE `roles` (
    `id` varchar(36) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `role_name` varchar(255) NOT NULL,
    `role_description` varchar(255) NULL,
    UNIQUE INDEX `IDX_ac35f51a0f17e3e1fe12112603` (`role_name`),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
CREATE TABLE `modules` (
    `id` varchar(36) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `module_name` varchar(255) NOT NULL,
    `module_description` varchar(255) NOT NULL,
    UNIQUE INDEX `IDX_e10bfbd4b8f0bdc8f363ab5757` (`module_name`),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
CREATE TABLE `permissions` (
    `id` varchar(36) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `permission_name` varchar(255) NOT NULL,
    `permission_description` varchar(255) NOT NULL,
    UNIQUE INDEX `IDX_b990eff1fc3540798960d80e45` (`permission_name`),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
CREATE TABLE `roles_modules_permissions` (
    `id` varchar(36) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `role_id` varchar(36) NULL,
    `module_id` varchar(36) NULL,
    `permission_id` varchar(36) NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
CREATE TRIGGER `before_insert_roles_modules_permissions` BEFORE
INSERT ON `roles_modules_permissions` FOR EACH ROW
SET new.id = (@i := uuid());
ALTER TABLE `roles_modules_permissions`
ADD CONSTRAINT `FK_c98894ef1dd4763af7f2c8bca92` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `roles_modules_permissions`
ADD CONSTRAINT `FK_0d2f804c284a817a1fd8bbbce8d` FOREIGN KEY (`module_id`) REFERENCES `modules`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `roles_modules_permissions`
ADD CONSTRAINT `FK_d35e0f562f85238137d015e5d6e` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
CREATE TABLE `users` (
    `id` varchar(36) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `username` varchar(15) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `position` varchar(255) NOT NULL,
    `role_id` varchar(36) NULL,
    UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`),
    UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
ALTER TABLE `users`
ADD CONSTRAINT `FK_a2cecd1a3531c0b041e29ba46e1` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
CREATE TABLE `historical` (
    `id` varchar(36) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `response_status_code` int NOT NULL,
    `user_id` varchar(36) NULL,
    `role_id` varchar(36) NULL,
    `module_id` varchar(36) NULL,
    `permission_id` varchar(36) NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
ALTER TABLE `historical`
ADD CONSTRAINT `FK_e28cccb0d33870ac1f81f7a727d` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `historical`
ADD CONSTRAINT `FK_a28dddc9e11324ac1f81f712adb` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `historical`
ADD CONSTRAINT `FK_6fe29c1ac45f3febc6c5701c33d` FOREIGN KEY (`module_id`) REFERENCES `modules`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `historical`
ADD CONSTRAINT `FK_df791dc106beff6270273c371a5` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
-- Actas
CREATE TABLE `historical` (
    `id` varchar(36) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `response_status_code` int NOT NULL,
    `user_id` varchar(255) NOT NULL,
    `role_id` varchar(255) NOT NULL,
    `module_id` varchar(255) NOT NULL,
    `permission_id` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
CREATE TABLE `attached_files` (
    `id` varchar(36) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `internal_filename` varchar(255) NOT NULL,
    `public_filename` varchar(255) NOT NULL,
    `file_location` varchar(255) NOT NULL,
    `author` varchar(255) NOT NULL,
    `meeting_minutes_id` varchar(36) NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
CREATE TABLE `subject_agenda_item` (
    `id` varchar(36) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `item_number` int NOT NULL,
    `item_content` text NOT NULL,
    `item_development` text NOT NULL,
    `meeting_minutes_id` varchar(36) NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
CREATE TABLE `meeting_minutes` (
    `id` varchar(36) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `number_meeting_minutes` int NOT NULL,
    `is_regular` tinyint NOT NULL DEFAULT 1,
    `organism_committee_area_program` varchar(255) NOT NULL,
    `meeting_place` varchar(255) NOT NULL,
    `meeting_date` timestamp NOT NULL,
    `start_time` varchar(255) NOT NULL,
    `ending_time` varchar(255) NOT NULL,
    `produced_by_id` varchar(36) NULL,
    `reviewed_by_id` varchar(36) NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
CREATE TABLE `activity` (
    `id` varchar(36) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `name_activity` varchar(255) NOT NULL,
    `activity_date` timestamp NOT NULL,
    `fulfillment` enum ('Yes', 'No', 'In Process') NOT NULL,
    `meeting_minutes_id` varchar(36) NULL,
    `responsible_user_id` varchar(36) NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
CREATE TABLE `observation` (
    `id` varchar(36) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `observation` text NOT NULL,
    `activity_id` varchar(36) NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
ALTER TABLE `attached_files`
ADD CONSTRAINT `FK_5684b106bbd1728ed7c3c14794b` FOREIGN KEY (`meeting_minutes_id`) REFERENCES `meeting_minutes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `subject_agenda_item`
ADD CONSTRAINT `FK_45c486ba2cde8e66b978d24abcc` FOREIGN KEY (`meeting_minutes_id`) REFERENCES `meeting_minutes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `meeting_minutes`
ADD CONSTRAINT `FK_0711faf421cc387657e2dabb5cf` FOREIGN KEY (`produced_by_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `meeting_minutes`
ADD CONSTRAINT `FK_16de00757a7c96ffd3f813ff04e` FOREIGN KEY (`reviewed_by_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `activity`
ADD CONSTRAINT `FK_3a201029b6b1867b7cfb38403fe` FOREIGN KEY (`meeting_minutes_id`) REFERENCES `meeting_minutes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `activity`
ADD CONSTRAINT `FK_16fb27f8c56d208b2f3cac1cf49` FOREIGN KEY (`responsible_user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `observation`
ADD CONSTRAINT `FK_80796f7bc479246d91c2bec73ed` FOREIGN KEY (`activity_id`) REFERENCES `activity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;