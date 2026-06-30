'use server'
import { CreateContactInput, CreateContactMutation, CreateContactMutationVariables, RemoveContactMutation, RemoveContactMutationVariables, UpdateContactInput, UpdateContactMutation, UpdateContactMutationVariables, Contact} from "@/gql/graphql"
import { Resource, resourceConfig } from "@/variables/admin/resource";
import { uploadFile } from "@/query/upload.http";
import { queryGraphQL } from "@/query/graphql";
import { CONTACT_UPDATE_MUTATION, CONTACT_CREATE_MUTATION, CONTACT_REMOVE_MUTATION } from "@/graphql/contacts.graphql";
import { PrevState, PrevStateFull } from "./action.type";


const CONTACT_SVG = 'contactSvg';
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
        await uploadFile(resourceConfig[Resource.CONTACT].createForm.uploadConfig, formData, CONTACT_SVG, result.createContact.id);
        
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

    const updateInput: UpdateContactInput = {
        id: id,
    };

    Object.entries(intitalValues).forEach(([key, value]) => {
        if (formData.get(key) !== value && key !== CONTACT_SVG) {
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

export async function updateContactImageAction(prevState: PrevStateFull<CreateContactInput["contactSvg"]>| undefined, formData: FormData, id: string):
 Promise<PrevStateFull<CreateContactInput["contactSvg"]>> {
    try {
        const res =await uploadFile(resourceConfig[Resource.CONTACT].createForm.uploadConfig, formData, CONTACT_SVG, id);
        
        return {
            success: true,
            message: 'Contact updated successfully!',
            data: (res.data as Contact).contactSvg
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Contact Update failed',
            data: null
        };
    }
}

export async function deleteContactAction(prevState: PrevState<CreateContactInput>| undefined, formData: FormData,  initialValues: UpdateContactInput, id: string)
:Promise<PrevState<CreateContactInput>> {
    const sliderId = formData.get('id')?.toString() as string;
    try {
       if (initialValues.id !== sliderId || id !== initialValues.id) throw Error("The id incorrect");
        const res = await queryGraphQL<RemoveContactMutation, RemoveContactMutationVariables>
        (CONTACT_REMOVE_MUTATION, {
            id: id,
        });
        return {
            success: true,
            message: `Contact with id ${id} deleted successfully`,
            id: res.removeContact
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

