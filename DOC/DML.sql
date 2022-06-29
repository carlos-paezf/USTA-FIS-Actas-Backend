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
INSERT INTO `modules` (`id`, `module_name`, `module_description`)
VALUES (
        'historical',
        'HISTORICAL',
        'Historical Module'
    );
);
INSERT INTO `modules` (`id`, `module_name`, `module_description`)
VALUES (
        'organizations',
        'ORGANIZATIONS',
        'Organizations Module'
    );
INSERT INTO `modules` (`id`, `module_name`, `module_description`)
VALUES (
        'attached-files',
        'ATTACHED FILES',
        'Attached Files Module'
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
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'historical', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'organizations', 'create');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'organizations', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'organizations', 'update');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'organizations',
        'soft-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'organizations', 'restore');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'organizations',
        'hard-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'attached-files', 'create');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'attached-files', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'attached-files', 'update');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'attached-files',
        'soft-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'developer', 'attached-files', 'restore');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'developer',
        'attached-files',
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
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'historical', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'organizations', 'create');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'organizations', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'organizations', 'update');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'organizations', 'soft-delete');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'organizations', 'restore');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'organizations', 'hard-delete');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'attached-files', 'create');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'attached-files', 'read');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'attached-files', 'update');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'attached-files',
        'soft-delete'
    );
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (uuid(), 'dean', 'attached-files', 'restore');
INSERT INTO `roles_modules_permissions` (`id`, `role_id`, `module_id`, `permission_id`)
VALUES (
        uuid(),
        'dean',
        'attached-files',
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
/* Inserción para Desarrollador por defecto */
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
        --developer1234567890
        "Desarrollador",
        "developer"
    );
/* 
 INSERT INTO `users`(`id`, `created_at`, `updated_at`, `deleted_at`, `name`, `last_name`, `username`, `email`, `password`, `position`, `role_id`) VALUES (?, DEFAULT, DEFAULT, DEFAULT, ?, ?, ?, ?, ?, ?, ?) -- PARAMETERS: ["8a4e6986-7dde-46d2-96a4-bdf92af02e1f","Carlos David","Páez Ferreira","carlos-paezf","carlos-paezf@usantoto.edu.co","$2b$10$dSbyYv5ok9VBipMkTy7tDOXF5ZeIQCkygOzmiO3o0nl6VkyLH5/qG","Desarrollador","guest"]
 */