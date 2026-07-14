import { CreateSliderInput,Slider } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "@/components/admin/components/FormUpdate";
import MainText from "@/components/text/MainText";

interface Props {
    initialValues: Slider,
    resourceId: string,
}
export default function UpdateFormSlider({initialValues, resourceId }: Props) {
    const sliderUpdate = resourceConfig[Resource.SLIDER].editFrom;
    const initialValuesEmpty = sliderUpdate.initialValues;
    Object.keys(initialValuesEmpty).forEach((key: string) => {
        // @ts-ignore
        initialValuesEmpty[key] = initialValues[key];
    })

    return (
        <FormUpdate<CreateSliderInput>
            inputs={sliderUpdate.inputs}
            intialValues={initialValuesEmpty}
            actionForm={(formData) =>
                sliderUpdate.action(
                    undefined,
                    formData,
                    initialValuesEmpty,
                    resourceId
                )
            }
            schema={sliderUpdate.schema}
            title={sliderUpdate.title}
        >
            <MainText tailwind="text-center">
                {sliderUpdate.title}
            </MainText>
        </FormUpdate>
    )

}