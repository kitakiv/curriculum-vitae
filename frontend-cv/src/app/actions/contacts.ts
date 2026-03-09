'use server'
import { CreateContactInput} from "@/gql/graphql"
import { createContact } from "@/query/contact.query"

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
        // const result = await createContact(
        //     {
        //         createContactInput:
        //             {
        //                 contactLink: formData.get('contactLink') as string,
        //                 contactName: formData.get('contactName') as string,
        //                 contactSvg: null
        //             }
        //     }
        // )
        console.log(formData);
        
        return {
            success: true,
            message: 'Signup successful!',
            id: null
            // id: result.id
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

