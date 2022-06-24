CREATE DATABASE IF NOT EXISTS `actas_fis` character set UTF8mb4 collate utf8mb4_unicode_ci;
/* ----------------------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------- Tablas Base -------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------------------------- */
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
/* ---------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------ Inserción de datos básicos ------------------------------------------------ */
/* ---------------------------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------- */
/* Inserción para Roles */
/* --------------------------------------------------------------- */
INSERT INTO `roles` (`id`, `role_name`, `role_description`)
VALUES (
        'developer',
        'DEVELOPER',
        'Role assigned to the application developer'
    );
INSERT INTO `roles` (`id`, `role_name`, `role_description`)
VALUES (
        'dean',
        'DEAN',
        'Role assigned to the dean of the faculty'
    );
INSERT INTO `roles` (`id`, `role_name`, `role_description`)
VALUES (
        'professor',
        'PROFESSOR',
        'Role assigned to faculty professor'
    );
INSERT INTO `roles` (`id`, `role_name`, `role_description`)
VALUES (
        'administrative',
        'ADMINISTRATIVE',
        'Role assigned to administrative staff of the university'
    );
INSERT INTO `roles` (`id`, `role_name`, `role_description`)
VALUES (
        'student',
        'STUDENT',
        'Role assigned to faculty student'
    );
INSERT INTO `roles` (`id`, `role_name`, `role_description`)
VALUES (
        'guest',
        'GUEST',
        'Role assigned to external faculty guest'
    );
/* --------------------------------------------------------------- */
/* Inserción para Permisos */
/* --------------------------------------------------------------- */
INSERT INTO `permissions` (
        `id`,
        `permission_name`,
        `permission_description`
    )
VALUES (
        'create',
        'CREATE',
        'Permission to create or insert data'
    );
INSERT INTO `permissions` (
        `id`,
        `permission_name`,
        `permission_description`
    )
VALUES (
        'read',
        'READ',
        'Access permission in read mode to data'
    );
INSERT INTO `permissions` (
        `id`,
        `permission_name`,
        `permission_description`
    )
VALUES (
        'update',
        'UPDATE',
        'Data update permission'
    );
INSERT INTO `permissions` (
        `id`,
        `permission_name`,
        `permission_description`
    )
VALUES (
        'soft-delete',
        'SOFT_DELETE',
        'Logical data deletion permission'
    );
INSERT INTO `permissions` (
        `id`,
        `permission_name`,
        `permission_description`
    )
VALUES (
        'restore',
        'RESTORE',
        'Logical data restore permission'
    );
INSERT INTO `permissions` (
        `id`,
        `permission_name`,
        `permission_description`
    )
VALUES (
        'hard-delete',
        'HARD_DELETE',
        'Physical data deletion permission'
    );
/* --------------------------------------------------------------- */
/* Inserción para Modulos */
/* --------------------------------------------------------------- */
INSERT INTO `modules` (`id`, `module_name`, `module_description`)
VALUES (
        'users',
        'USERS',
        'User administration module'
    );
INSERT INTO `modules` (`id`, `module_name`, `module_description`)
VALUES (
        'roles',
        'ROLES',
        'Role Management Module'
    );
INSERT INTO `modules` (`id`, `module_name`, `module_description`)
VALUES (
        'permissions',
        'PERMISSIONS',
        'Permission management module'
    );
INSERT INTO `modules` (`id`, `module_name`, `module_description`)
VALUES (
        'minutes-of-meeting',
        'MINUTES OF MEETING',
        'Meeting Minutes Management Module'
    );
INSERT INTO `modules` (`id`, `module_name`, `module_description`)
VALUES (
        'roles-modules-permissions',
        'ROLES MODULES PERMISSIONS',
        'Module permissions on modules by role'
    );
INSERT INTO `modules` (`id`, `module_name`, `module_description`)
VALUES (
        'modules',
        'MODULES',
        'Module'
    );
/* --------------------------------------------------------------- */
/* Inserción para Roles */
/* --------------------------------------------------------------- */
-- Permisos para desarrollador
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'users', 'create');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'users', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'users', 'update');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'users', 'soft-delete');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'users', 'restore');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'users', 'hard-delete');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'roles', 'create');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'roles', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'roles', 'update');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'roles', 'soft-delete');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'roles', 'restore');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'roles', 'hard-delete');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'permissions', 'create');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'permissions', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'permissions', 'update');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'permissions',
        'soft-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'permissions', 'restore');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'permissions',
        'hard-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'minutes-of-meeting',
        'create'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'minutes-of-meeting',
        'read'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'minutes-of-meeting',
        'update'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'minutes-of-meeting',
        'soft-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'minutes-of-meeting',
        'restore'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'minutes-of-meeting',
        'hard-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'roles-modules-permissions',
        'create'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'roles-modules-permissions',
        'read'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'roles-modules-permissions',
        'update'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'roles-modules-permissions',
        'soft-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'roles-modules-permissions',
        'restore'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'roles-modules-permissions',
        'hard-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'modules',
        'create'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'modules',
        'read'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'modules',
        'update'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'modules',
        'soft-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'modules',
        'restore'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'modules',
        'hard-delete'
    );
-- Permisos para decano(a)
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'users', 'create');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'users', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'users', 'update');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'users', 'soft-delete');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'users', 'restore');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'users', 'hard-delete');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'roles', 'create');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'roles', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'roles', 'update');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'roles', 'soft-delete');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'roles', 'restore');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'roles', 'hard-delete');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'permissions', 'create');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'permissions', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'permissions', 'update');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'permissions', 'soft-delete');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'permissions', 'restore');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'permissions', 'hard-delete');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'minutes-of-meeting', 'create');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'minutes-of-meeting', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'minutes-of-meeting', 'update');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'minutes-of-meeting',
        'soft-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'minutes-of-meeting', 'restore');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'minutes-of-meeting',
        'hard-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'roles-modules-permissions',
        'create'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'roles-modules-permissions',
        'read'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'roles-modules-permissions',
        'update'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'roles-modules-permissions',
        'soft-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'roles-modules-permissions',
        'restore'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'roles-modules-permissions',
        'hard-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'modules',
        'create'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'modules',
        'read'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'modules',
        'update'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'modules',
        'soft-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'modules',
        'restore'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'modules',
        'hard-delete'
    );
-- Permisos para docente
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'professor', 'users', 'create');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'professor', 'users', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'professor', 'users', 'update');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'professor', 'users', 'soft-delete');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'professor',
        'minutes-of-meeting',
        'create'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'professor',
        'minutes-of-meeting',
        'read'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'professor',
        'minutes-of-meeting',
        'update'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'professor',
        'minutes-of-meeting',
        'soft-delete'
    );
-- Permisos para administrativo
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'administrative', 'users', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'administrative',
        'minutes-of-meeting',
        'read'
    );
-- Permisos para desarrollador
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'student', 'users', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'student', 'minutes-of-meeting', 'read');
-- Permisos para invitado
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'guest', 'minutes-of-meeting', 'read');
/* --------------------------------------------------------------- */
/* Inserción temporarl para developer */
/* --------------------------------------------------------------- */
INSERT INTO `users`(
        `id`,
        `created_at`,
        `updated_at`,
        `deleted_at`,
        `name`,
        `last_name`,
        `username`,
        `email`,
        `password`,
        `position`,
        `role_id`
    )
VALUES (
        uuid(),
        DEFAULT,
        DEFAULT,
        DEFAULT,
        "Carlos David",
        "Páez Ferreira",
        "carlos-paezf",
        "carlos-paezf@usantoto.edu.co",
        "$2b$10$dSbyYv5ok9VBipMkTy7tDOXF5ZeIQCkygOzmiO3o0nl6VkyLH5/qG",
        "Desarrollador",
        "developer"
    );