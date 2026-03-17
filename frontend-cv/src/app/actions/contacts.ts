'use server'
import { CreateContactInput, CreateContactMutation, CreateContactMutationVariables, UpdateContactInput, UpdateContactMutation, UpdateContactMutationVariables} from "@/gql/graphql"
import { Resource, resourceConfig } from "@/variables/admin/resource";
import { uploadFile } from "@/query/upload.http";
import { queryGraphQL } from "@/query/graphql";
import { CONTACT_UPDATE_MUTATION, CONTACT_CREATE_MUTATION } from "@/graphql/contacts.graphql";
import { PrevState } from "./action.type";



export async function createContactAction(prevState: PrevState<CreateContactInput>| undefined, formData: FormData):
 Promise<PrevState<CreateContactInput>> {

    try {
        console.log(formData);
        const result = await queryGraphQL<CreateContactMutation, CreateContactMutationVariables>(
            CONTACT_CREATE_MUTATION,
            {
                createContactInput:
                    {
                        contactLink: formData.get('contactLink') as string,
                        contactName: formData.get('contactName') as string,
                    }
            }
        );
        await uploadFile(resourceConfig[Resource.CONTACT].createForm.uploadConfig, formData, 'contactSvg', result.createContact.id);
        
        return {
            success: true,
            message: 'Contact created successfully!',
            id: result.createContact.id
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

export async function updateContactAction(prevState: PrevState<CreateContactInput>| undefined, formData: FormData, intitalValues: CreateContactInput, id: string):
 Promise<PrevState<CreateContactInput>> {
    console.log(formData);
    console.log(intitalValues);

    const updateInput: UpdateContactInput = {
        id: id,
    };

    Object.entries(intitalValues).forEach(([key, value]) => {
        if (formData.get(key) !== value) {
            updateInput[key as keyof UpdateContactInput] = formData.get(key);
        }
    })
    try {
        const res = await queryGraphQL<UpdateContactMutation, UpdateContactMutationVariables>
        (CONTACT_UPDATE_MUTATION, {
            updateContactInput: {
                ...updateInput
            },
        });
        return {
            success: true,
            message: 'Contact updated successfully!',
            id: res.updateContact.id
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

export async function updateContactImageAction(prevState: PrevState<CreateContactInput>| undefined, formData: FormData, id: string):
 Promise<PrevState<CreateContactInput>> {
    try {
        await uploadFile(resourceConfig[Resource.CONTACT].createForm.uploadConfig, formData, 'contactSvg', id);
        
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

