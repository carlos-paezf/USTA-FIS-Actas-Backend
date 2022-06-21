CREATE TABLE `modules` (
    `id` varchar(36) NOT NULL,
    `status` tinyint NOT NULL DEFAULT 1,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `module_name` varchar(255) NOT NULL,
    `module_description` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `permissions` (
    `id` varchar(36) NOT NULL,
    `status` tinyint NOT NULL DEFAULT 1,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `permission_name` varchar(255) NOT NULL,
    `permission_description` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `users` (
    `id` varchar(36) NOT NULL,
    `status` tinyint NOT NULL DEFAULT 1,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `username` varchar(15) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `position` enum (
        `DEAN`,
        `DEVELOPER`,
        `ADMINISTRATIVE`,
        `PROFESSOR`,
        `STUDENT`,
        `GUEST`
    ) NOT NULL DEFAULT `PROFESSOR`,
    `role_id` varchar(36) NULL,
    UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`),
    UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`),
    PRIMARY KEY (`id`)
);
CREATE TABLE `roles` (
    `id` varchar(36) NOT NULL,
    `status` tinyint NOT NULL DEFAULT 1,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `role_name` varchar(255) NOT NULL,
    `role_description` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `roles_modules_permissions` (
    `id` varchar(36) NOT NULL,
    `status` tinyint NOT NULL DEFAULT 1,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `role_id` varchar(36) NULL,
    `module_id` varchar(36) NULL,
    `permission_id` varchar(36) NULL,
    PRIMARY KEY (`id`)
);
ALTER TABLE `users`
ADD CONSTRAINT `FK_a2cecd1a3531c0b041e29ba46e1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `roles_modules_permissions`
ADD CONSTRAINT `FK_c98894ef1dd4763af7f2c8bca92` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `roles_modules_permissions`
ADD CONSTRAINT `FK_0d2f804c284a817a1fd8bbbce8d` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `roles_modules_permissions`
ADD CONSTRAINT `FK_d35e0f562f85238137d015e5d6e` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;