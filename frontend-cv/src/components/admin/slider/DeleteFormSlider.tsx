import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormCreate from "../components/FormCreate";
import { CreateSliderInput, UpdateSliderInput } from "@/gql/graphql";
import MainText from "@/components/text/MainText";
import FormDelete from "../components/FormDelete";
import { Slider } from "@/gql/graphql";
import { Update } from "@reduxjs/toolkit";
import MiddleText from "@/components/text/MiddleText";

interface Props {
    resource: Slider;
    resourceId: string;
}

export default function DeleteFormSlider({resource, resourceId }: Props) {
    const sliderDelete = resourceConfig[Resource.SLIDER].deleteForm;
    const inputs = [
        { id: "id", label: `Write the id ${resourceId}`, name: "id", placeholder: `${resourceId}`, type: "text" },
    ]
    return (
        <>
            <FormDelete<UpdateSliderInput>
                inputs={inputs}
                schema={sliderDelete.schema(resourceId)}
                initialValues={sliderDelete.initialValues}
                actionForm={(formData) => sliderDelete.action(undefined, formData, resource, resourceId)}
                title={sliderDelete.title}
            >
                <>
                <MainText tailwind="text-center">
                    {sliderDelete.title}
                </MainText>
                <MiddleText tailwind=" text-txFirst0" >
                    {resource.sliderName}
                </MiddleText>
                 </>
            </FormDelete>
     </>  
    )
}