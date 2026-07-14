import { CreateTechStackInput, TechStack } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "../components/FormUpdate";
import { useState } from "react";


interface Props {
    initialValues: TechStack,
    resourceId: string,
}

export default function UpdateFormTechStackImage({ initialValues, resourceId }: Props) {
    const techStackUpdateImage = resourceConfig[Resource.TECHSTACK].editFormImage;
    const initialValuesEmpty = techStackUpdateImage.initialValues;
    const techStackUpdate = resourceConfig[Resource.TECHSTACK].editFormImage;
    const [image, setImage] = useState(initialValues.techSvg);

    return (
        <FormUpdate<CreateTechStackInput["techSvg"]>
            inputs={techStackUpdate.inputs}
            tailwind="flex flex-col items-center"
            intialValues={initialValuesEmpty}
            actionForm={async (formData) => {
                const res = await techStackUpdate.action(
                    undefined,
                    formData,
                    resourceId
                )
                if (res.success && res.data) {
                   setImage(res.data);
                }
                return res;
            }
            }
            schema={techStackUpdate.schema}
            title={techStackUpdate.title}
        >
           <img src={image as string} alt={initialValues.techName} className="h-40 w-40" />
        </FormUpdate>
    )
}