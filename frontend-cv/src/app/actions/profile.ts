'use server'
import {  Profile, UpdateProfileInput, UpdateProfileMutation, UpdateProfileMutationVariables } from "@/gql/graphql"
import { Resource, resourceConfig } from "@/variables/admin/resource";
import { addFile, deleteFileIndex, uploadFile, uploadFiles } from "@/query/upload.http";
import { queryGraphQL } from "@/query/graphql";
import {  } from "@/graphql/profile.graphql";
import { PrevState, PrevStateFull } from "./action.type";
import {PROFILE_UPDATE_MUTATION} from "@/graphql/profile.graphql";

const PROFILE_PHOTOS = 'profilePhotos';
const PROFILE_PHOTO = 'profilePhoto';

export async function updateProfileAction(prevState: PrevState<Profile>| undefined, formData: FormData, intitalValues: Profile, id: string):
 Promise<PrevState<Profile>> {

    const updateInput: UpdateProfileInput = {};

    Object.entries(intitalValues).forEach(([key, value]) => {
        if (formData.get(key) !== value && key !== PROFILE_PHOTOS) {
            updateInput[key as keyof UpdateProfileInput] = formData.get(key);
        }
    });
    try {
        const res = await queryGraphQL<UpdateProfileMutation, UpdateProfileMutationVariables>
        (PROFILE_UPDATE_MUTATION, {
            updateProfileInput: {
                ...updateInput
            }
        });
        return {
            success: true,
            message: 'Profile updated successfully!',
            id: res.updateProfile.id
        };
    } catch (error) {
        console.error('Creation erorr', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Profile Update failed',
            id: null
        };
    }
    
}

export async function updateProfileImageAction(prevState: PrevStateFull<Profile['profilePhotos']>| undefined, formData: FormData, id: string, index: string):
 Promise<PrevStateFull<Profile['profilePhotos']>> {
    try {
        const res = await uploadFile(resourceConfig[Resource.PROFILE].editFormImage.uploadConfig, formData, PROFILE_PHOTO, id, index);
        
        return {
            success: true,
            message: `Profile image ${index + 1} updated successfully!`,
            data: (res.data as Profile).profilePhotos 
        };
    } catch (error) {
        console.error('Update error', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Profile image update failed',
            data: null
        };
    }
}

export async function deleteProfileImageAction(prevState: PrevStateFull<Profile['profilePhotos']>| undefined, id: string, index: string):
 Promise<PrevStateFull<Profile['profilePhotos']>> {
    try {
        const res = await deleteFileIndex(resourceConfig[Resource.PROFILE].editFormImage.uploadConfig, id, index);
        return {
            success: true,
            message: `Profile image ${index} deleted successfully!`,
            data: (res.data as Profile).profilePhotos
        }
    } catch (error) {
        console.error('Update error', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Profile image delete failed',
            data: null
        };
    }
}

export async function addProfileImageAction(prevState: PrevStateFull<Profile['profilePhotos']>| undefined, formData: FormData, id: string):
 Promise<PrevStateFull<Profile['profilePhotos']>> {
    try {
        const res =await addFile(resourceConfig[Resource.PROFILE].editFormImage.uploadConfig, formData, PROFILE_PHOTO, id);
        
        return {
            success: true,
            message: 'Profile image added successfully!',
            data: (res.data as Profile).profilePhotos
        }
    } catch (error) {
        console.error('Update error', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Profile image add failed',
            data: null
        }
    }
    
}

export async function updateProfileImagesAction(prevState: PrevStateFull<Profile['profilePhotos']>| undefined, formData: FormData, id: string):
 Promise<PrevStateFull<Profile['profilePhotos']>> {
    try {
        const res = await uploadFiles(resourceConfig[Resource.PROFILE].editFormImage.uploadConfig, formData, PROFILE_PHOTOS, id);
        
        return {
            success: true,
            message: 'Profile images updated successfully!',
            data: (res.data as Profile).profilePhotos
        }
    } catch (error) {
        console.error('Update error', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Profile images update failed',
            data: null
        }
    }
}
