'use server'
import {  CreateCertificateInput, CreateCertificateMutation, CreateCertificateMutationVariables, UpdateCertificateInput, UpdateCertificateMutation, UpdateCertificateMutationVariables, UpdateSliderInput, UpdateSliderMutation, UpdateSliderMutationVariables} from "@/gql/graphql"
import { Resource, resourceConfig } from "@/variables/admin/resource";
import { uploadFile } from "@/query/upload.http";
import { queryGraphQL } from "@/query/graphql";
import { CERTIFICATE_CREATE_MUTATION, CERTIFICATE_UPDATE_MUTATION } from "@/graphql/certificate.graphql";
import { PrevState } from "./action.type";

const CERTIFICATE_IMAGE = 'certificateImage';
export async function createCertificateAction(prevState: PrevState<CreateCertificateInput>| undefined, formData: FormData):
 Promise<PrevState<CreateCertificateInput>> {
    const startDate = new Date(formData.get('certificatePeriodStart') as string);
    const endDate = new Date(formData.get('certificatePeriodEnd') as string);
    try {
        const result = await queryGraphQL<CreateCertificateMutation, CreateCertificateMutationVariables>(
            CERTIFICATE_CREATE_MUTATION,
            {
                createCertificateInput:
                    {
                         certificateTitle: formData.get('certificateTitle')?.toString() as string,
                         certificateDescription: formData.get('certificateDescription')?.toString() as string,
                         certificateCompany: formData.get('certificateCompany')?.toString() as string,
                         certificatePeriodStart: startDate,
                         certificatePeriodEnd: endDate,
                         certificateLink: formData.get('certificateLink')?.toString() as string | null,
                    }
            }
        );
        await uploadFile(resourceConfig[Resource.CERTIFICATE].createForm.uploadConfig, formData, CERTIFICATE_IMAGE, result.createCertificate.id);
        
        return {
            success: true,
            message: 'Certificate created successfully!',
            id: result.createCertificate.id
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Certificate creation failed',
            id: null
        };
    }
}

export async function updateCertificateAction(prevState: PrevState<CreateCertificateInput>| undefined, formData: FormData, intitalValues: CreateCertificateInput, id: string):
 Promise<PrevState<CreateCertificateInput>> {

    const updateInput: UpdateCertificateInput = {
        id: id,
    };

    Object.entries(intitalValues).forEach(([key, value]) => {
        if (formData.get(key) !== value && key !== CERTIFICATE_IMAGE) {
            updateInput[key as keyof UpdateCertificateInput] = formData.get(key);
        }
    });
    try {
        const res = await queryGraphQL<UpdateCertificateMutation, UpdateCertificateMutationVariables>
        (CERTIFICATE_UPDATE_MUTATION, {
            updateCertificateInput: {
                ...updateInput
            }
        });
        return {
            success: true,
            message: 'Certificate updated successfully!',
            id: res.updateCertificate.id
        };
    } catch (error) {
        console.error('Creation erorr', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Certificate Update failed',
            id: null
        };
    }
    
}

export async function updateCertificateImageAction(prevState: PrevState<CreateCertificateInput>| undefined, formData: FormData, id: string):
 Promise<PrevState<CreateCertificateInput>> {
    try {
        await uploadFile(resourceConfig[Resource.CERTIFICATE].createForm.uploadConfig, formData, CERTIFICATE_IMAGE, id);
        
        return {
            success: true,
            message: 'Certificate image updated successfully!',
            id: id
        };
    } catch (error) {
        console.error('Update error', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Certificate image update failed',
            id: null
        };
    }
}

