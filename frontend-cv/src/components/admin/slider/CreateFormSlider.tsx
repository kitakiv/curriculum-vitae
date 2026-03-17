import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormCreate from "../components/FormCreate";
import { CreateSliderInput } from "@/gql/graphql";
import MainText from "@/components/text/MainText";

export default function CreateFormSlider() {
    const sliderCreate = resourceConfig[Resource.SLIDER].createForm;
    return (
        <>
            <FormCreate<CreateSliderInput>
                inputs={sliderCreate.inputs}
                intialValues={sliderCreate.initialValues}
                actionForm={(formData) => sliderCreate.action(undefined, formData)}
                schema={sliderCreate.schema}
                title={sliderCreate.title}
            >
                <MainText tailwind="text-center">
                    {sliderCreate.title}
                </MainText>
            </FormCreate>
        </>
    )
}