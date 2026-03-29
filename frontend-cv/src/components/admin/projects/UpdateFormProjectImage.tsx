import { Project } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "../components/FormUpdate";
import MiddleText from "@/components/text/MiddleText";
import { getImageIndex } from "@/variables/admin/image";


interface Props {
    initialValues: Project,
    resourceId: string,
}

export default function UpdateFormProjectImage({ initialValues, resourceId }: Props) {
    const projectUpdateImage = resourceConfig[Resource.PROJECT].editFormImage;

    if (!initialValues.projectImages || initialValues.projectImages.length === 0) {
        return null;
    }


    return (
        initialValues.projectImages.map((image: string) => {
            const imageIndex = getImageIndex(image);
            console.log("imageIndex", imageIndex);
            if (imageIndex === -1) {
                return null;
            }
            return (
                <FormUpdate<Project>
                    key={`${image.split('/').at(-1)}-${imageIndex}`}
                    inputs={projectUpdateImage.inputs}
                    tailwind="flex flex-col items-center"
                    intialValues={initialValues}
                    actionForm={(formData) =>
                        projectUpdateImage.action(
                            undefined,
                            formData,
                            resourceId,
                            imageIndex
                        )
                    }
                    schema={projectUpdateImage.schema}
                    title={projectUpdateImage.title}
                >
                    <MiddleText  tailwind="color-adminTx">
                        {`${projectUpdateImage.title} ${imageIndex + 1}`}
                    </MiddleText>
                    <img
                        className="w-72 h-fit object-cover rounded-lg"
                        src={image}
                        alt={image.split('/').at(-1) || "developer"}
                    />
                </FormUpdate>
            )
        })
    )
}