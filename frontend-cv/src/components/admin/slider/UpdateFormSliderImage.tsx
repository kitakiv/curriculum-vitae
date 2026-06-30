import { Slider, CreateSliderInput } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "../components/FormUpdate";
import { useState } from "react";


interface Props {
    initialValues: Slider,
    resourceId: string,
}

export default function UpdateFormSliderImage({ initialValues, resourceId }: Props) {
    const updateSliderImage = resourceConfig[Resource.SLIDER].editFormImage;
    const intialValuesEmpty = updateSliderImage.initialValues;
    const [ image, setImage ] = useState(initialValues.sliderImage);
    return (
        <FormUpdate<CreateSliderInput["sliderImage"]>
            inputs={updateSliderImage.inputs}
            tailwind="flex flex-col items-center"
            intialValues={intialValuesEmpty}
            actionForm={async (formData) => {
                const res = await updateSliderImage.action(undefined, formData, resourceId);
                if (res.success && res.data) {
                    setImage(res.data);
                }
                return res;
            }
            }
            schema={updateSliderImage.schema}
            title={updateSliderImage.title}
        >   
           <img src={image} alt={intialValuesEmpty.sliderName} className="w-72 h-fit rounded-lg" />
        </FormUpdate>
    )
}