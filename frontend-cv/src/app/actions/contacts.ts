'use server'
import { CreateContactInput} from "@/gql/graphql"
import { createContact } from "@/query/contact.query";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import { uploadFile } from "@/query/upload.http";

export type ContactFormState = {
    message?: string;
    errors?: {
        [K in keyof CreateContactInput]?: string[];
    };
    success?: boolean;
    id: string | null;
};

export async function createContactAction(prevState: ContactFormState| undefined, formData: FormData): Promise<ContactFormState> {
    ;

    try {
        console.log(formData);
        const result = await createContact(
            {
                createContactInput:
                    {
                        contactLink: formData.get('contactLink') as string,
                        contactName: formData.get('contactName') as string,
                    }
            }
        );
        await uploadFile(resourceConfig[Resource.CONTACT].createForm.uploadConfig, formData, 'contactSvg', result.id);
        
        return {
            success: true,
            message: 'Contact created successfully!',
            id: result.id
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

