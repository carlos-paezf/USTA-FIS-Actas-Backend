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