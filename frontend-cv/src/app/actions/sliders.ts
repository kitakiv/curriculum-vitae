'use server'
import {  CreateSliderInput, CreateSliderMutation, CreateSliderMutationVariables, RemoveSliderMutation, RemoveSliderMutationVariables, UpdateSliderInput, UpdateSliderMutation, UpdateSliderMutationVariables} from "@/gql/graphql"
import { Resource, resourceConfig } from "@/variables/admin/resource";
import { uploadFile } from "@/query/upload.http";
import { queryGraphQL } from "@/query/graphql";
import { SLIDER_CREATE_MUTATION, SLIDER_REMOVE_MUTATION, SLIDER_UPDATE_MUTATION } from "@/graphql/slider.graphql";
import { PrevState } from "./action.type";

const SLIDER_IMAGE = 'sliderImage';

export async function createSliderAction(prevState: PrevState<CreateSliderInput>| undefined, formData: FormData):
 Promise<PrevState<CreateSliderInput>> {

    try {
        const result = await queryGraphQL<CreateSliderMutation, CreateSliderMutationVariables>(
            SLIDER_CREATE_MUTATION,
            {
                createSliderInput:
                    {
                         sliderName: formData.get('sliderName')?.toString() as string,
                         sliderText: formData.get('sliderText')?.toString() as string,
                    }
            }
        );
        await uploadFile(resourceConfig[Resource.SLIDER].createForm.uploadConfig, formData, SLIDER_IMAGE, result.createSlider.id);
        
        return {
            success: true,
            message: 'Slider created successfully!',
            id: result.createSlider.id
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Slider creation failed',
            id: null
        };
    }
}

export async function updateSliderAction(prevState: PrevState<CreateSliderInput>| undefined, formData: FormData, intitalValues: CreateSliderInput, id: string):
 Promise<PrevState<CreateSliderInput>> {

    const updateInput: UpdateSliderInput = {
        id: id,
    };

    Object.entries(intitalValues).forEach(([key, value]) => {
        if (formData.get(key) !== value && key !== SLIDER_IMAGE) {
            updateInput[key as keyof UpdateSliderInput] = formData.get(key)?.toString() as string;
        }
    })
    try {
        const res = await queryGraphQL<UpdateSliderMutation, UpdateSliderMutationVariables>
        (SLIDER_UPDATE_MUTATION, {
            updateSliderInput: {
                ...updateInput
            },
        });
        return {
            success: true,
            message: 'Slider updated successfully!',
            id: res.updateSlider.id
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Slider Update failed',
            id: null
        };
    }
    
}

export async function updateSliderImageAction(prevState: PrevState<CreateSliderInput>| undefined, formData: FormData, id: string):
 Promise<PrevState<CreateSliderInput>> {
    try {
        await uploadFile(resourceConfig[Resource.SLIDER].createForm.uploadConfig, formData, SLIDER_IMAGE, id);
        
        return {
            success: true,
            message: 'Contact updated successfully!',
            id: id
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Contact Update failed',
            id: null
        };
    }
}

export async function deleteSliderAction(prevState: PrevState<CreateSliderInput>| undefined, formData: FormData,  initialValues: UpdateSliderInput, id: string)
:Promise<PrevState<CreateSliderInput>> {
    const sliderId = formData.get('id')?.toString() as string;
    console.log(sliderId, initialValues.id, id);
    try {
       if (initialValues.id !== sliderId || id !== initialValues.id) throw Error("The id incorrect");
        const res = await queryGraphQL<RemoveSliderMutation, RemoveSliderMutationVariables>
        (SLIDER_REMOVE_MUTATION, {
            id: id,
        });
        return {
            success: true,
            message: `Slider with id ${id} deleted successfully`,
            id: res.removeSlider
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Slider deletion failed',
            id: null
        };
    }
}

