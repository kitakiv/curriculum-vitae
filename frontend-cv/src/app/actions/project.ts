'use server'
import {  CreateProjectInput, Project, UpdateProjectMutationVariables, UpdateProjectInput, UpdateProjectMutation, CreateProjectMutation, CreateProjectMutationVariables, RemoveProjectMutation, RemoveProjectMutationVariables } from "@/gql/graphql"
import { Resource, resourceConfig } from "@/variables/admin/resource";
import { uploadFile, uploadFiles } from "@/query/upload.http";
import { queryGraphQL } from "@/query/graphql";
import {  } from "@/graphql/profile.graphql";
import { PrevState } from "./action.type";
import { PROJECT_UPDATE_MUTATION, PROJECT_CREATE_MUTATION, PROJECT_REMOVE_MUTATION } from "@/graphql/project.graphql";

const PROJECT_IMAGES = 'projectImages';
const PROJECT_IMAGE = 'projectImage';

export async function updateProjectAction(prevState: PrevState<CreateProjectInput>| undefined, formData: FormData, intitalValues: Project, id: string):
 Promise<PrevState<CreateProjectInput>> {

    const updateInput: UpdateProjectInput = {
        id: id
    };

    Object.entries(intitalValues).forEach(([key, value]) => {
        if (value instanceof Array) {
            const formValues = formData.getAll(key) as string[];
                updateInput[key as keyof UpdateProjectInput] = formValues;
        } else {
            if (formData.get(key) !== value && key !== PROJECT_IMAGES) {
                updateInput[key as keyof UpdateProjectInput] = formData.get(key);
            }
        }
    });
    const techStacksTheSame = intitalValues.techStacks?.map((tech) => tech.id).sort().toString() === (formData.getAll('techStacks') as string[]).sort().toString();
    if (techStacksTheSame) {
        delete updateInput.techStacks;
    }
    const imagesTheSame = true;
    if (imagesTheSame) {
        delete updateInput.projectImages;
    }
    if (Object.keys(updateInput).length === 1) {
        return {
            success: false,
            message: 'No changes detected',
            id: null
        };
    }
    try {
        const res = await queryGraphQL<UpdateProjectMutation, UpdateProjectMutationVariables>
        (PROJECT_UPDATE_MUTATION, {
            updateProjectInput: {
                ...updateInput
            }
        });
        return {
            success: true,
            message: 'Project updated successfully!',
            id: res.updateProject.id
        };
    } catch (error) {
        console.error('Creation erorr', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Project Update failed',
            id: null
        };
    }
    
}

export async function updateProjectImageAction(prevState: PrevState<CreateProjectInput>| undefined, formData: FormData, id: string, index: number):
 Promise<PrevState<CreateProjectInput>> {
    try {
        await uploadFile(resourceConfig[Resource.PROJECT].editFormImage.uploadConfig, formData, PROJECT_IMAGE, id, index);
        
        return {
            success: true,
            message: `Project image ${index + 1} updated successfully!`,
            id: id
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

export async function updateProjectImagesAction(prevState: PrevState<Project>| undefined, formData: FormData, id: string):
 Promise<PrevState<Project>> {
    try {
        await uploadFiles(resourceConfig[Resource.PROJECT].editFormImage.uploadConfig, formData, PROJECT_IMAGES, id);
        
        return {
            success: true,
            message: 'Project images updated successfully!',
            id: id
        }
    } catch (error) {
        console.error('Update error', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Profile images update failed',
            id: null
        }
    }
}



export async function createProjectAction(prevState: PrevState<CreateProjectInput>| undefined, formData: FormData):
 Promise<PrevState<CreateProjectInput>> {

    try {
        const result = await queryGraphQL<CreateProjectMutation, CreateProjectMutationVariables>(
            PROJECT_CREATE_MUTATION,
            {
                createProjectInput:
                    {
                        projectTitle: formData.get('projectTitle') as string,
                        projectDescription: formData.get('projectDescription') as string,
                        projectGithubLink: formData.get('projectGithubLink') as string,
                        projectDemoLink: formData.get('projectDemoLink') as string,
                        techStacks: formData.getAll('techStacks') as string[],
                    }
            }
        );
        await uploadFiles(resourceConfig[Resource.PROJECT].createForm.uploadConfig, formData, PROJECT_IMAGES, result.createProject.id);
        
        return {
            success: true,
            message: 'Project created successfully!',
            id: result.createProject.id
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
export async function deleteProjectAction(prevState: PrevState<UpdateProjectInput>| undefined, formData: FormData,  initialValues: Project, id: string)
:Promise<PrevState<UpdateProjectInput>> {
    const projectId = formData.get('id')?.toString() as string;
    try {
       if (initialValues.id !== projectId || id !== initialValues.id) throw Error("The id incorrect");
        const res = await queryGraphQL<RemoveProjectMutation, RemoveProjectMutationVariables>
        (PROJECT_REMOVE_MUTATION, {
            id: id,
        });
        return {
            success: true,
            message: `Project with id ${id} deleted successfully`,
            id: res.removeProject
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Project deletion failed',
            id: null
        };
    }
}
