'use server'
import { CreateProjectInput, CreateTechStackInput, CreateTechStackMutation, CreateTechStackMutationVariables, DeleteTechStackMutation, DeleteTechStackMutationVariables, TechStack, UpdateTechStackInput, UpdateTechStackMutation, UpdateTechStackMutationVariables } from "@/gql/graphql"
import { Resource, resourceConfig } from "@/variables/admin/resource";
import { uploadFile, uploadFiles } from "@/query/upload.http";
import { queryGraphQL } from "@/query/graphql";
import { PrevState } from "./action.type";
import { TECHSTACK_CREATE_MUTATION, TECHSTACK_DELETE_MUTATION, TECHSTACK_UPDATE_MUTATION } from "@/graphql/techStack.graphql";
import { StringifyOptions } from "querystring";

const TECHSTACK_SVG = 'techSvg';

export async function updateTechStackAction(prevState: PrevState<CreateTechStackInput>| undefined, formData: FormData, intitalValues: TechStack, id: string):
 Promise<PrevState<CreateTechStackInput>> {

    const updateInput: UpdateTechStackInput = {
        id: id
    };

    Object.entries(intitalValues).forEach(([key, value]) => {
        if (value instanceof Array) {
            const formValues = formData.getAll(key) as string[];
                updateInput[key as keyof UpdateTechStackInput] = formValues;
        } else {
            if (formData.get(key) !== value && key !== TECHSTACK_SVG) {
                updateInput[key as keyof UpdateTechStackInput] = formData.get(key);
            }
        }
    });
    try {
        const res = await queryGraphQL<UpdateTechStackMutation, UpdateTechStackMutationVariables>
        (TECHSTACK_UPDATE_MUTATION, {
            updateTechStackInput: {
                ...updateInput
            }
        });
        return {
            success: true,
            message: 'TechStack updated successfully!',
            id: res.updateTechStack.id
        };
    } catch (error) {
        console.error('Creation erorr', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'TechStack Update failed',
            id: null
        };
    }
    
}

export async function updateTechStackImageAction(prevState: PrevState<CreateTechStackInput>| undefined, formData: FormData, id: string):
 Promise<PrevState<CreateTechStackInput>> {
    try {
        await uploadFile(resourceConfig[Resource.TECHSTACK].editFormImage.uploadConfig, formData, TECHSTACK_SVG, id);
        
        return {
            success: true,
            message: `TechStack svg updated successfully!`,
            id: id,
        };
    } catch (error) {
        console.error('Update error', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Profile image update failed',
            id: null
        };
    }
}




export async function createTechStackAciton(prevState: PrevState<CreateTechStackInput>| undefined, formData: FormData):
 Promise<PrevState<CreateProjectInput>> {

    try {
        const result = await queryGraphQL<CreateTechStackMutation, CreateTechStackMutationVariables>(
            TECHSTACK_CREATE_MUTATION,
            {
                createTechStackInput:
                    {
                       techName: formData.get('techName')?.toString() as string,
                       techCategories: formData.getAll('techCategories') as string[],
                       projects: formData.getAll('projects') as string[],
                    }
            }
        );
        await uploadFile(resourceConfig[Resource.TECHSTACK].createForm.uploadConfig, formData, TECHSTACK_SVG, result.createTechStack.id);
        
        return {
            success: true,
            message: 'TechStack created successfully!',
            id: result.createTechStack.id
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'TechStack creation failed',
            id: null
        };
    }
}
export async function deleteTechStackAciton(prevState: PrevState<UpdateTechStackInput>| undefined, formData: FormData,  initialValues: TechStack, id: string)
:Promise<PrevState<UpdateTechStackInput>> {
    const projectId = formData.get('id')?.toString() as string;
    try {
       if (initialValues.id !== projectId || id !== initialValues.id) throw Error("The id incorrect");
        const res = await queryGraphQL<DeleteTechStackMutation, DeleteTechStackMutationVariables>
        (TECHSTACK_DELETE_MUTATION, {
            id: id,
        });
        return {
            success: true,
            message: `TechStack with id ${id} deleted successfully`,
            id: res.removeTechStack
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'TechStack deletion failed',
            id: null
        };
    }
}
