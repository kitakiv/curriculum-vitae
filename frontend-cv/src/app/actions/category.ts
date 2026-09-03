'use server'
import { CreateTechCategoryInput, CreateTechCategoryMutation, CreateTechCategoryMutationVariables, RemoveTechCategoryMutation, RemoveTechCategoryMutationVariables, UpdateTechCategoryInput, UpdateTechCategoryMutation, UpdateTechCategoryMutationVariables, TechCategory } from "@/gql/graphql"
import { queryGraphQL } from "@/query/graphql";
import { PrevState, PrevStateFull } from "./action.type";
import { TECHCATEGORY_CREATE_MUTATION, TECHCATEGORY_DELETE_MUTATION, TECHCATEGORY_UPDATE_MUTATION, TECHCATEGORIES_DELETE_MUTATION} from "@/graphql/techCategory.graphql";
import { RemoveTechCategoriesMutation } from "@/gql/graphql";
import { RemoveTechCategoriesMutationVariables } from "@/gql/graphql";


export async function updateTechCategoryAction(prevState: PrevState<UpdateTechCategoryInput>| undefined, formData: FormData, intitalValues: TechCategory, id: string):
 Promise<PrevState<UpdateTechCategoryInput>> {

    const updateInput: UpdateTechCategoryInput = {
        id: id
    };

    Object.entries(intitalValues).forEach(([key, value]) => {
        if (value instanceof Array) {
            const formValues = formData.getAll(key) as unknown as string[] & string;
                updateInput[key as keyof UpdateTechCategoryInput] = formValues;
        } else {
            if (formData.get(key) !== value) {
                updateInput[key as keyof UpdateTechCategoryInput] = formData.get(key) as unknown as string & string[];
            }
        }
    });
    const techCategoryIds = updateInput.techStacks?.sort().join(',') || '';
    if (techCategoryIds === intitalValues.techStacks?.sort().join(',')) {
        delete updateInput.techStacks;
    }
    if (Object.keys(updateInput).length === 1 && updateInput.id) {
        return {
            success: false,
            message: 'No changes detected',
            id: null
        };
    }
    try {
        const res = await queryGraphQL<UpdateTechCategoryMutation, UpdateTechCategoryMutationVariables>
        (TECHCATEGORY_UPDATE_MUTATION, {
            updateTechCategoryInput: {
                ...updateInput
            }
        });
        return {
            success: true,
            message: 'TechCategory updated successfully!',
            id: res.updateTechCategory.id
        };
    } catch (error) {
        console.error('Creation erorr', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'TechCategory Update failed',
            id: null
        };
    }
    
}





export async function createTechCategoryAction(prevState: PrevState<CreateTechCategoryInput>| undefined, formData: FormData):
 Promise<PrevState<CreateTechCategoryInput>> {

    try {
        const result = await queryGraphQL<CreateTechCategoryMutation, CreateTechCategoryMutationVariables>(
            TECHCATEGORY_CREATE_MUTATION,
            {
                createTechCategoryInput:
                    {
                       categoryName: formData.get('categoryName')?.toString() as string,
                       techStacks: formData.getAll('techStacks') as string[],
                    }
            }
        );
        return {
            success: true,
            message: 'TechCategory created successfully!',
            id: result.createTechCategory.id
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'TechCategory creation failed',
            id: null
        };
    }
}
export async function deleteTechCategoryAction(prevState: PrevState<UpdateTechCategoryInput>| undefined, formData: FormData,  initialValues: TechCategory, id: string)
:Promise<PrevState<UpdateTechCategoryInput>> {
    const techCategoryId = formData.get('id')?.toString() as string;
    try {
       if (initialValues.id !== techCategoryId || id !== initialValues.id) throw Error("The id incorrect");
        const res = await queryGraphQL<RemoveTechCategoryMutation, RemoveTechCategoryMutationVariables>
        (TECHCATEGORY_DELETE_MUTATION, {
            id: id,
        });
        return {
            success: true,
            message: `TechCategory with id ${id} deleted successfully`,
            id: res.removeTechCategory
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'TechCategory deletion failed',
            id: null
        };
    }
}

export async function deleteTechCategoriesAction(prevState: PrevStateFull<{ids: string[]}>| undefined, formData: FormData)
:Promise<PrevStateFull<{ids: string[]}>> {
    const techCategoriesIds = formData.getAll('ids') as string[];
    try {
        const res = await queryGraphQL<RemoveTechCategoriesMutation, RemoveTechCategoriesMutationVariables>
        (TECHCATEGORIES_DELETE_MUTATION, {
            ids: techCategoriesIds,
        });
        return {
            success: true,
            message: `TechCategories with ids ${techCategoriesIds.join(', ')} deleted successfully`,
            data: {
                ids: res.removeTechCategories
            }
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : `TechCategories with ids ${techCategoriesIds.join(', ')} deletion failed`,
            data: {
                ids: []
            }
        };
    }
}


