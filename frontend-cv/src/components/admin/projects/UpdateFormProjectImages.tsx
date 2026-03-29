import { Project } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "../components/FormUpdate";
import MiddleText from "@/components/text/MiddleText";


interface Props {
    initialValues: Project,
    resourceId: string,
}

export default function UpdateFormProjectImages({ initialValues, resourceId }: Props) {
    const projectUpdateImage = resourceConfig[Resource.PROJECT].editFormImages;
    return (
        <FormUpdate<Project>
            inputs={projectUpdateImage.inputs}
            tailwind="flex flex-col items-center"
            intialValues={initialValues}
            actionForm={(formData) =>
                projectUpdateImage.action(
                    undefined,
                    formData,
                    resourceId
                )
            }
            schema={projectUpdateImage.schema}
            title={projectUpdateImage.title}
        >
            <MiddleText  tailwind="color-adminTx">
               !!!Important all previos images will be deleted
            </MiddleText>
        </FormUpdate>
    )
}