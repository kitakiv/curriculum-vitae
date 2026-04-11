import { useState } from "react"; // { useState}
import {  Profile, Project } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import { getImageIndex } from "@/variables/admin/image";
import FormUpdateOneImage from "../components/FormOneImage";
import FormAddOneImage from "../components/FormOneImageAdd";
import FormUpdate from "../components/FormUpdate";
import MainText from "@/components/text/MainText";
import { profile } from "console";



interface Props {
    initialValues: Project,
    resourceId: string,
}

export default function UpdateFormProjectImage({ initialValues, resourceId }: Props) {
    const projectUpdateImage = resourceConfig[Resource.PROJECT].editFormImage;
    const  projectDeleteImage = resourceConfig[Resource.PROJECT].deleteFormImage;
    const projectAddImage = resourceConfig[Resource.PROJECT].addFormImage;
    const projectUpdateImages = resourceConfig[Resource.PROJECT].editFormImages;
    const [images, setImages] = useState<string[]>(initialValues.projectImages || []);


    return (<div>
        {images.map((image: string) => {
            const imageIndex = getImageIndex(image);
            if (!imageIndex) {
                return null;
            }
            return (
                <FormUpdateOneImage<Project["projectImages"]>
                    key={`${image.split('/').at(-1)}-${imageIndex}`}
                    inputs={projectUpdateImage.inputs}
                    tailwind="flex flex-col items-center"
                    intialValues={initialValues}
                    actionForm={async (formData, type) => {
                        if (type === 'delete') {
                            const res = await projectDeleteImage.action(undefined, resourceId, imageIndex);
                            if (res.success && res.data) {
                                setImages(res.data);
                            }
                            return res;
                        } else {
                            const res = await projectUpdateImage.action(undefined, formData, resourceId, imageIndex);
                            if (res.success && res.data) {
                                setImages(res.data);
                            }
                            return res;
                        }
                    }
                    }
                    schema={projectUpdateImage.schema}
                    title={projectUpdateImage.title}
                >
                    <img
                        className="w-10/12 h-fit rounded-lg object-cover"
                        src={image}
                        alt={image.split('/').at(-1) || "developer"}
                    />
                </FormUpdateOneImage>
            )
            
        })}
        <FormAddOneImage<Project["projectImages"]>
            inputs={projectAddImage.inputs}
            tailwind="flex flex-col items-center"
            intialValues={initialValues}
            actionForm={async (formData) => {
                const res = await projectAddImage.action(undefined, formData, resourceId);
                if (res.success && res.data) {
                    setImages(res.data);
                }
                return res;
            }
            }
            schema={projectAddImage.schema}
            title={projectAddImage.title}
        >
            <MainText  tailwind="color-adminTx">
                {`${projectAddImage.title}`}
            </MainText>
        </FormAddOneImage>
        <FormUpdate<Project["projectImages"]>
                    inputs={projectUpdateImages.inputs}
                    tailwind="flex flex-col items-center"
                    intialValues={initialValues}
                    actionForm={async (formData) => {
                        const res =  await projectUpdateImages.action(
                            undefined,
                            formData,
                            resourceId
                        );
                        if (res.success && res.data) {
                            setImages(res.data);
                        }
                        return res;
                    }
                    }
                    schema={projectUpdateImages.schema}
                    title={projectUpdateImages.title}
                >
                    <MainText>
                        {projectUpdateImages.title}
                    </MainText>
            </FormUpdate>
        </div>
    )
}
