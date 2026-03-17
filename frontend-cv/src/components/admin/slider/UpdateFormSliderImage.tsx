import { Slider, CreateSliderInput } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "../components/FormUpdate";


interface Props {
    initialValues: Slider,
    resourceId: string,
}

export default function UpdateFormSliderImage({ initialValues, resourceId }: Props) {
    const updateSliderImage = resourceConfig[Resource.SLIDER].editFormImage;
    const intialValuesEmpty = updateSliderImage.initialValues;
    Object.keys(intialValuesEmpty).forEach((key: string) => {
        intialValuesEmpty[key] = initialValues[key];
    })

    return (
        <FormUpdate<CreateSliderInput>
            inputs={updateSliderImage.inputs}
            tailwind="flex flex-col items-center"
            intialValues={intialValuesEmpty}
            actionForm={(formData) =>
                updateSliderImage.action(
                    undefined,
                    formData,
                    resourceId
                )
            }
            schema={updateSliderImage.schema}
            title={updateSliderImage.title}
        >   
           <img src={intialValuesEmpty.sliderImage} alt={intialValuesEmpty.sliderName} className="w-72 h-fit rounded-lg" />
        </FormUpdate>
    )
}