'use server'
import {  CreateRoleInput, CreateRoleMutation, CreateRoleMutationVariables, Permission, RemoveRoleMutation, RemoveRoleMutationVariables, UpdateRoleInput, UpdateRoleMutation, UpdateRoleMutationVariables} from "@/gql/graphql"
import { queryGraphQL } from "@/query/graphql";
import { PrevState } from "./action.type";
import { ROLE_CREATE_MUTATION, ROLE_REMOVE_MUTATION, ROLE_UPDATE_MUTATION } from "@/graphql/role.graphql";


export async function createRoleAction(prevState: PrevState<CreateRoleInput>| undefined, formData: FormData):
 Promise<PrevState<CreateRoleInput>> {

    try {
        const result = await queryGraphQL<CreateRoleMutation, CreateRoleMutationVariables>(
            ROLE_CREATE_MUTATION,
            {
                createRoleInput:
                    {
                        name: formData.get('name') as string,
                        permissions: formData.getAll('permissions') as Permission[]
                    }
            }
        );
        
        return {
            success: true,
            message: 'Role created successfully!',
            id: result.createRole.id
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Signup failed',
            id: null
        };
    }
}

export async function updateRoleAction(prevState: PrevState<UpdateRoleInput>| undefined, formData: FormData, intitalValues: UpdateRoleInput, id: string):
 Promise<PrevState<UpdateRoleInput>> {

    const updateInput: UpdateRoleInput = {
        id: id,
    };

     Object.entries(intitalValues).forEach(([key, value]) => {
            if (value instanceof Array) {
                const formValues = formData.getAll(key) as string[];
                    updateInput[key as keyof UpdateRoleInput] = formValues;
            } else {
                if (formData.get(key) !== value) {
                    updateInput[key as keyof UpdateRoleInput] = formData.get(key);
                }
            }
        });
    try {
        const res = await queryGraphQL<UpdateRoleMutation, UpdateRoleMutationVariables>
        (ROLE_UPDATE_MUTATION, {
            updateRoleInput: {
                ...updateInput
            },
        });
        return {
            success: true,
            message: 'Role updated successfully!',
            id: res.updateRole.id
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Role Update failed',
            id: null
        };
    }
    
}

export async function deleteRoleAction(prevState: PrevState<UpdateRoleInput>| undefined, formData: FormData,  initialValues: UpdateRoleInput, id: string)
:Promise<PrevState<UpdateRoleInput>> {
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
        console.log(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Role deletion failed',
            id: null
        };
    }
}

