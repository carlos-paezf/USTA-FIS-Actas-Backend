CREATE DATABASE IF NOT EXISTS `actas_fis`;
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
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
CREATE TABLE `permissions` (
    `id` varchar(36) NOT NULL,
    `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deleted_at` timestamp(6) NULL,
    `permission_name` varchar(255) NOT NULL,
    `permission_description` varchar(255) NOT NULL,
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
ALTER TABLE `roles_modules_permissions`
ADD CONSTRAINT `FK_c98894ef1dd4763af7f2c8bca92` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `roles_modules_permissions`
ADD CONSTRAINT `FK_0d2f804c284a817a1fd8bbbce8d` FOREIGN KEY (`module_id`) REFERENCES `modules`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `roles_modules_permissions`
ADD CONSTRAINT `FK_d35e0f562f85238137d015e5d6e` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
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
        'minutes-od-meeting',
        'MINUTES OF MEETING',
        'Meeting Minutes Management Module'
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
        'minutes-od-meeting',
        'create'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'minutes-od-meeting',
        'read'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'minutes-od-meeting',
        'update'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'minutes-od-meeting',
        'soft-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'minutes-od-meeting',
        'restore'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'minutes-od-meeting',
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
VALUES (uuid(), 'dean', 'minutes-od-meeting', 'create');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'minutes-od-meeting', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'minutes-od-meeting', 'update');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'minutes-od-meeting',
        'soft-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'minutes-od-meeting', 'restore');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'minutes-od-meeting',
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
        'minutes-od-meeting',
        'create'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'professor',
        'minutes-od-meeting',
        'read'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'professor',
        'minutes-od-meeting',
        'update'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'professor',
        'minutes-od-meeting',
        'soft-delete'
    );
-- Permisos para administrativo
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'administrative', 'users', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'administrative',
        'minutes-od-meeting',
        'read'
    );
-- Permisos para desarrollador
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'student', 'users', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'student', 'minutes-od-meeting', 'read');
-- Permisos para invitado
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'guest', 'minutes-od-meeting', 'read');