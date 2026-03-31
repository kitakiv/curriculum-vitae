import { Resource, resourceConfig } from "@/variables/admin/resource";
import { TechCategory, UpdateTechCategoryInput } from "@/gql/graphql";
import MainText from "@/components/text/MainText";
import FormDelete from "../components/FormDelete";
import MiddleText from "@/components/text/MiddleText";

interface Props {
    resource: TechCategory;
    resourceId: string;
}

export default function DeleteFormTechCategory({resource, resourceId }: Props) {
    const techCategoryDelete = resourceConfig[Resource.CATEGORY].deleteForm;
    const inputs = [
        { id: "id", label: `Write the id ${resourceId}`, name: "id", placeholder: `${resourceId}`, type: "text" },
    ]
    return (
        <>
            <FormDelete<UpdateTechCategoryInput>
                inputs={inputs}
                schema={techCategoryDelete.schema(resourceId)}
                initialValues={techCategoryDelete.initialValues}
                actionForm={(formData) => techCategoryDelete.action(undefined, formData, resource, resourceId)}
                title={techCategoryDelete.title}
            >
                <>
                <MainText tailwind="text-center">
                    {techCategoryDelete.title}
                </MainText>
                <MiddleText tailwind=" text-txFirst0" >
                    {resource.categoryName}
                </MiddleText>
                 </>
            </FormDelete>
     </>  
    )
}