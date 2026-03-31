import { Contact, CreateContactInput, CreateTechStackInput, TechStack } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "../components/FormUpdate";


interface Props {
    initialValues: TechStack,
    resourceId: string,
}

export default function UpdateFormTechStackImage({ initialValues, resourceId }: Props) {
    const techStackUpdateImage = resourceConfig[Resource.TECHSTACK].editFormImage;
    const initialValuesEmpty = techStackUpdateImage.initialValues;
    const techStackUpdate = resourceConfig[Resource.TECHSTACK].editFormImage;

    return (
        <FormUpdate<CreateTechStackInput>
            inputs={techStackUpdate.inputs}
            tailwind="flex flex-col items-center"
            intialValues={initialValuesEmpty}
            actionForm={(formData) =>
                techStackUpdate.action(
                    undefined,
                    formData,
                    resourceId
                )
            }
            schema={techStackUpdate.schema}
            title={techStackUpdate.title}
        >
           <img src={initialValues.techSvg || ''} alt={initialValues.techName} className="h-40 w-40" />
        </FormUpdate>
    )
}