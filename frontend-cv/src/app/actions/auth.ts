'use server'
import {
    AttachRoleInput,
    AttachRoleToUserMutation,
    AttachRoleToUserMutationVariables,
    DeleteUserMutation,
    DeleteUserMutationVariables,
    LoginInput,
    SignUpInput,
    User,
    LogoutMutation,
    LogoutMutationVariables,
    UpdateUserMutation,
    UpdateUserMutationVariables
} from "@/gql/graphql"
import {
    USER_ATTACH_ROLE_MUTATION,
    USER_DELETE_QUERY,
    LOGOUT_AUTH_QUERY,
    USERS_DELETE_QUERY,
    USER_UPDATE_MUTATION
} from "@/graphql/auth.graphql";
import { loginUser, signUpUser } from "@/query/auth.query";
import { queryGraphQL } from "@/query/graphql";
import { PrevState, PrevStateFull } from "./action.type";
import { clearTokens } from "@/lib/auth";
import { redirect } from "next/navigation";
import header from "@/variables/header/header";
import { DeleteUsersMutation } from "@/gql/graphql";
import { DeleteUsersMutationVariables } from "@/gql/graphql";
import { SignupMutation } from "@/gql/graphql";
import { UpdateUserInput } from "@/gql/graphql";
import { resourceConfig, Resource } from "@/variables/admin/resource";
import { uploadFile } from "@/query/upload.http";


const USER_IMAGE = 'avatarPhoto';

export type LoginFormState = {
    message?: string;
    errors?: {
        [K in keyof LoginInput]?: string[];
    };
    success?: boolean;
};

export type SignupFormState = {
    message?: string;
    errors?: {
        [K in keyof SignUpInput]?: string[];
    };
    success?: boolean;
};

export async function signup(prevState: SignupFormState | undefined, formData: FormData): Promise<SignupFormState> {
    const name = formData.get('name') as string;
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;
    try {
        const result = await signUpUser({
            signUpInput: {
                login,
                name,
                password
            }
        }) as SignupMutation['signup'];
        return {
            success: result.success,
            message: result.message
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Signup failed'
        };
    }
}

export async function login(prevState: LoginFormState | undefined, formData: FormData): Promise<LoginFormState> {
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;
    const redirectUrl = header.buttonAdmin.link;
    let success: boolean = false;

    try {
        const result = await loginUser({
            loginInput: {
                login,
                password
            }
        });
        success = true;
        return {
            success: true,
            message: "login successful"
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Login failed'
        };
    } finally {
        if (success) {

            redirect(redirectUrl);
        }
    }
}

export async function logoutUserAction(): Promise<PrevStateFull<boolean>> {
    'use server'
    try {
        const result = await queryGraphQL<LogoutMutation, LogoutMutationVariables>(
            LOGOUT_AUTH_QUERY, {}
        ) as unknown as LogoutMutation;

        return {
            data: result.logout,
            success: true,
            message: 'Logged out successfully'
        };
    } catch (error) {
        return {
            data: false,
            success: false,
            message: error instanceof Error ? error.message : 'Role attachment failed'
        };

    }
    finally {
        clearTokens();
        redirect('/');
    }
}

export async function attachRoleToUserAction(prevState: PrevState<AttachRoleInput> | undefined, formData: FormData, initialValues: User, userId: string): Promise<PrevState<AttachRoleInput>> {
    const roleId = formData.get('roleId') as string;
    const userIdFromForm = formData.get('userId') as string;

    if (userIdFromForm !== userId) {
        return {
            id: userId,
            success: false,
            message: 'User ID mismatch'
        };
    }
    if (initialValues.role && initialValues.role.id === roleId) {
        return {
            id: userId,
            success: false,
            message: 'User already has this role'
        };
    }

    try {
        const result = await queryGraphQL<AttachRoleToUserMutation, AttachRoleToUserMutationVariables>(
            USER_ATTACH_ROLE_MUTATION,
            {
                attachRoleInput: {
                    userId,
                    roleId
                }
            }
        );

        return {
            id: result.attachRole.id,
            success: true,
            message: `Role ${result.attachRole.name} attached successfully to user ${result.attachRole.login}`
        };
    } catch (error) {
        return {
            id: userId,
            success: false,
            message: error instanceof Error ? error.message : 'Role attachment failed'
        };

    }
}


export async function updateUserAction(prevState: PrevState<UpdateUserInput> | undefined, formData: FormData, intitalValues: UpdateUserInput, id: string):
    Promise<PrevState<UpdateUserInput>> {

    const updateInput: UpdateUserInput = {};

    Object.entries(intitalValues).forEach(([key, value]) => {
        if (formData.get(key) !== value && key !== USER_IMAGE) {
            updateInput[key as keyof UpdateUserInput] = formData.get(key)?.toString() as string;
        }
    });
    if (Object.keys(updateInput).length === 0) {
        return {
            success: false,
            message: 'No changes detected',
            id: null
        };
    };
    try {
        const res = await queryGraphQL<UpdateUserMutation, UpdateUserMutationVariables>
            (USER_UPDATE_MUTATION, {
                updateUserInput: {
                    ...updateInput
                },
            });
        return {
            success: true,
            message: 'Profile updated successfully!',
            id: res.updateUser.id
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'User Update failed',
            id: null
        };
    }

}

export async function updateUserImageAction(prevState: PrevStateFull<string | null> | undefined, formData: FormData, id: string):
    Promise<PrevStateFull<string | null>> {
    try {
        const res = await uploadFile(resourceConfig[Resource.USER].editFormImage.uploadConfig, formData, USER_IMAGE, id);

        return {
            success: true,
            message: 'Profile updated successfully!',
            data: (res.data as User).avatarPhoto
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Profile Update failed',
            data: null
        };
    }
}

export async function deleteUserAction(prevState: PrevState<{ id: string }> | undefined, formData: FormData, userId: string): Promise<PrevState<{ id: string }>> {
    const userIdFromForm = formData.get('id') as string;

    if (userIdFromForm !== userId) {
        return {
            id: userId,
            success: false,
            message: 'User ID mismatch'
        };
    }

    try {
        const result = await queryGraphQL<DeleteUserMutation, DeleteUserMutationVariables>(
            USER_DELETE_QUERY,
            { id: userId }
        );

        return {
            id: result.removeUser,
            success: true,
            message: 'User deleted successfully'
        };
    } catch (error) {
        return {
            id: userId,
            success: false,
            message: error instanceof Error ? error.message : 'User deletion failed'
        };
    }
};


export async function deleteUsersAction(prevState: PrevStateFull<{ ids: string[] }> | undefined, formData: FormData): Promise<PrevStateFull<{ ids: string[] }>> {
    const userIdsFromForm = formData.getAll('ids') as string[];
    const userId = formData.get('resourceId') as string;
    if (!userId) throw new Error('User ID not found');
    if (!userIdsFromForm.includes(userId)) {
        return {
            data: {
                ids: userIdsFromForm
            },
            success: false,
            message: 'Your user ID is in the list of user IDs to delete'
        };
    }
    try {
        const result = await queryGraphQL<DeleteUsersMutation, DeleteUsersMutationVariables>(
            USERS_DELETE_QUERY,
            { ids: userIdsFromForm }
        ) as unknown as DeleteUsersMutation;

        return {
            data: {
                ids: result.removeUsers
            },
            success: true,
            message: `Users with ids ${userIdsFromForm.join(', ')} deleted successfully`
        };
    } catch (error) {
        return {
            data: {
                ids: userIdsFromForm
            },
            success: false,
            message: error instanceof Error ? error.message : `Users with ids ${userIdsFromForm.join(', ')} deletion failed`
        };
    }
};




