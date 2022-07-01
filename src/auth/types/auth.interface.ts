export interface ModulePermission {
    moduleId: string,
    permissionId: string
}

export interface TokenPayload {
    id: string,
    email: string,
    username: string,
    role: {
        id: string,
        roleName: string,
        deletedAt: Date | null
    },
    modulesPermissions: ModulePermission[]
}