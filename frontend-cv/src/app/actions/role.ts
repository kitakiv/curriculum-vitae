'use server'
import { CreatePermissionInput, CreateRoleInput, CreateRoleMutation, CreateRoleMutationVariables, RemoveRoleMutation, RemoveRoleMutationVariables, Role, UpdateRoleInput, UpdateRoleMutation, UpdateRoleMutationVariables } from "@/gql/graphql"
import { cachedQueryGraphQl, queryGraphQL } from "@/query/graphql";
import { PrevState, PrevStateFull } from "./action.type";
import { RESOURCES_GET_QUERY, ROLE_CREATE_MUTATION, ROLE_REMOVE_MUTATION, ROLE_UPDATE_MUTATION } from "@/graphql/role.graphql";
import { getAllPermissions } from "@/query/permission.query";
import { RemoveRolesMutation } from "@/gql/graphql";
import { RemoveRolesMutationVariables } from "@/gql/graphql";
import { ROLES_REMOVE_MUTATION } from "@/graphql/role.graphql";


export async function createRoleAction(prevState: PrevState<CreateRoleInput> | undefined, formData: FormData):
    Promise<PrevState<CreateRoleInput>> {
    const formattedPermissions = JSON.parse(formData.get('permissions') as string);
    try {
        const permissions = await correctFormatPermissions(formattedPermissions);

        const result = await queryGraphQL<CreateRoleMutation, CreateRoleMutationVariables>(
            ROLE_CREATE_MUTATION,
            {
                createRoleInput:
                {
                    name: formData.get('name') as string,
                    permissions: permissions
                }
            }
        );

        return {
            success: true,
            message: `Role ${result.createRole.name} created successfully!`,
            id: result.createRole.id
        };
    } catch (error) {
        console.error('Role create error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Role creation failed',
            id: null
        }
    }
}

export async function updateRoleAction(prevState: PrevStateFull<UpdateRoleInput> | undefined, formData: FormData, intitalValues: UpdateRoleInput, id: string):
    Promise<PrevStateFull<UpdateRoleInput>> {
    const updateInput: UpdateRoleInput = {
        id: id,
    };

    const permissions = await correctFormatPermissions(JSON.parse(formData.get('permissions') as string));
    updateInput.name = formData.get('name')?.toString();
    updateInput.permissions = permissions;
    console.log(updateInput);
    try {
        const res = await queryGraphQL<UpdateRoleMutation, UpdateRoleMutationVariables>
            (ROLE_UPDATE_MUTATION, {
                updateRoleInput: {
                    ...updateInput,
                    id: id
                },
            });
        return {
            success: true,
            message: 'Role updated successfully!',
            data: res.updateRole,
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Role Update failed',
            data: {
                id: id,
                name: intitalValues.name,
                permissions: intitalValues.permissions
            }
        };
    }

}

export async function deleteRoleAction(prevState: PrevState<UpdateRoleInput> | undefined, formData: FormData, initialValues: UpdateRoleInput, id: string)
    : Promise<PrevState<UpdateRoleInput>> {
    const roleId = formData.get('id')?.toString() as string;
    try {
        if (initialValues.id !== roleId || id !== initialValues.id) throw Error("The id incorrect");
        const res = await queryGraphQL<RemoveRoleMutation, RemoveRoleMutationVariables>
            (ROLE_REMOVE_MUTATION, {
                id: id,
            });
        return {
            success: true,
            message: `Role with id ${id} deleted successfully`,
            id: res.removeRole
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Role deletion failed',
            id: null
        };
    }
}

export async function deleteRolesAction(prevState: PrevState<{ids: string[]}> | undefined, formData: FormData)
    : Promise<PrevState<{ids: string[]}>> {
    const rolesIds = formData.getAll('ids') as string[];
    try {
        const res = await queryGraphQL<RemoveRolesMutation, RemoveRolesMutationVariables>
            (ROLES_REMOVE_MUTATION, {
                ids: rolesIds
            });
        return {
            success: true,
            message: `Roles with ids ${rolesIds.join(', ')} deleted successfully`,
            id: res.removeRoles
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : `Roles with ids ${rolesIds.join(', ')} deletion failed`,
            id: null
        };
    }
}


async function correctFormatPermissions(permissions: Record<string, Record<string, boolean>>): Promise<CreatePermissionInput[]> {
    try {
        const allPermissions = await getAllPermissions();
        const resoucesKeys = allPermissions.map(permission => permission.resource);
        const actionKeys = allPermissions[0].actions;
        const result: CreatePermissionInput[] = resoucesKeys.reduce((acc: CreatePermissionInput[], resource: string) => {
            // resource exist in form data
            if (permissions[resource]) {
                // find all actions that are true
                const actions = actionKeys.reduce((acc: string[], action: string) => {
                    if (permissions[resource][action]) {
                        acc.push(action);
                    }
                    return acc;
                }, []);
                if (actions.length > 0)
                    acc.push({ resource, actions });
                return acc;
            }
            return acc;
        }, []);
        return result;
    } catch (error) {
        throw error;
    }
}

 export async function formCreateFormatValues(): Promise<Record<string, Record<string, boolean>>> {
    try {
        const permissions = await getAllPermissions();
        const resouces = {} as Record<string, Record<string, boolean>>;
        permissions.forEach((permission: CreatePermissionInput ) => {
            const actions = {} as Record<string, boolean>;
            permission.actions.forEach((action: string) => {
                actions[action] = false;
            });
            resouces[permission.resource] = actions;
        })
        return resouces;
    } catch (error) {
        throw error;
    }
}

export async function formUpdateFormatValues(role: Role): Promise<Record<string, Record<string, boolean>>> {
    try {
       const rolePermissions = role.permissions;
       const permissionValues = await formCreateFormatValues();
        rolePermissions.forEach(rolePermission => {
            rolePermission.actions.forEach(action => {
                permissionValues[rolePermission.resource][action] = true;
            })
        });
        return permissionValues;
    } catch (error) {
        throw error;
    }
}

