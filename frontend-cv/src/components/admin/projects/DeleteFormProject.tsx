import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormCreate from "../components/FormCreate";
import { CreateSliderInput, Project, UpdateSliderInput } from "@/gql/graphql";
import MainText from "@/components/text/MainText";
import FormDelete from "../components/FormDelete";
import { Slider } from "@/gql/graphql";
import { Update } from "@reduxjs/toolkit";
import MiddleText from "@/components/text/MiddleText";

interface Props {
    resource: Project;
    resourceId: string;
}

export default function DeleteFormProject({resource, resourceId }: Props) {
    const projectDelete = resourceConfig[Resource.PROJECT].deleteForm;
    const inputs = [
        { id: "id", label: `Write the id ${resourceId}`, name: "id", placeholder: `${resourceId}`, type: "text" },
    ]
    return (
        <>
            <FormDelete<UpdateSliderInput>
                inputs={inputs}
                schema={projectDelete.schema(resourceId)}
                initialValues={projectDelete.initialValues}
                actionForm={(formData) => projectDelete.action(undefined, formData, resource, resourceId)}
                title={projectDelete.title}
            >
                <>
                <MainText tailwind="text-center">
                    {projectDelete.title}
                </MainText>
                <MiddleText tailwind=" text-txFirst0" >
                    {resource.projectTitle}
                </MiddleText>
                 </>
            </FormDelete>
     </>  
    )
}