import { useState } from "react"; // { useState}
import {  Profile } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import MiddleText from "@/components/text/MiddleText";
import { getImageIndex } from "@/variables/admin/image";
import FormUpdateOneImage from "../components/FormOneImage";
import FormAddOneImage from "../components/FormOneImageAdd";
import FormUpdate from "../components/FormUpdate";
import MainText from "@/components/text/MainText";



interface Props {
    initialValues: Profile,
    resourceId: string,
}

export default function UpdateFormProfileImage({ initialValues, resourceId }: Props) {
    const profileUpdateImage = resourceConfig[Resource.PROFILE].editFormImage;
    const  profileDeleteImage = resourceConfig[Resource.PROFILE].deleteFormImage;
    const profileAddImage = resourceConfig[Resource.PROFILE].addFormImage;
    const profileUpdateImages = resourceConfig[Resource.PROFILE].editFormImages;
    const [images, setImages] = useState<string[]>(initialValues.profilePhotos || []);



    return (<div>
        {images.map((image: string) => {
            const imageIndex = getImageIndex(image);
            console.log("imageIndex", imageIndex);
            if (!imageIndex) {
                return null;
            }
            return (
                <FormUpdateOneImage<Profile["profilePhotos"]>
                    key={`${image.split('/').at(-1)}-${imageIndex}`}
                    inputs={profileUpdateImage.inputs}
                    tailwind="flex flex-col items-center"
                    intialValues={initialValues}
                    actionForm={async (formData, type) => {
                        if (type === 'delete') {
                            const res = await profileDeleteImage.action(undefined, resourceId, imageIndex);
                            if (res.success && res.data) {
                                setImages(res.data);
                            }
                            return res;
                        } else {
                            const res = await profileUpdateImage.action(undefined, formData, resourceId, imageIndex);
                            if (res.success && res.data) {
                                setImages(res.data);
                            }
                            return res;
                        }
                    }
                    }
                    schema={profileUpdateImage.schema}
                    title={profileUpdateImage.title}
                >
                    <img
                        className="w-40 h-40 rounded-full object-cover"
                        src={image}
                        alt={image.split('/').at(-1) || "developer"}
                    />
                </FormUpdateOneImage>
            )
            
        })}
        <FormAddOneImage<Profile["profilePhotos"]>
            inputs={profileAddImage.inputs}
            tailwind="flex flex-col items-center"
            intialValues={initialValues}
            actionForm={async (formData) => {
                const res = await profileAddImage.action(undefined, formData, resourceId);
                if (res.success && res.data) {
                    setImages(res.data);
                }
                return res;
            }
            }
            schema={profileAddImage.schema}
            title={profileAddImage.title}
        >
            <MainText  tailwind="color-adminTx">
                {`${profileAddImage.title}`}
            </MainText>
        </FormAddOneImage>
        <FormUpdate<Profile["profilePhotos"]>
                    inputs={profileUpdateImages.inputs}
                    tailwind="flex flex-col items-center"
                    intialValues={initialValues}
                    actionForm={async (formData) => {
                        const res =  await profileUpdateImages.action(
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
                    schema={profileUpdateImages.schema}
                    title={profileUpdateImages.title}
                >
                    <MainText>
                        {profileUpdateImages.title}
                    </MainText>
            </FormUpdate>
        </div>
    )
}
