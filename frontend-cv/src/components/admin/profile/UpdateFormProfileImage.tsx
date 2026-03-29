import {  Profile } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "../components/FormUpdate";
import MiddleText from "@/components/text/MiddleText";
import { getImageIndex } from "@/variables/admin/image";
import AdminImage from "../components/AdminImage";


interface Props {
    initialValues: Profile,
    resourceId: string,
}

export default function UpdateFormProfileImage({ initialValues, resourceId }: Props) {
    const profileUpdateImage = resourceConfig[Resource.PROFILE].editFormImage;
    console.log("profileUpdateImage", profileUpdateImage);

    if (!initialValues.profilePhotos || initialValues.profilePhotos.length === 0) {
        return null;
    }


    return (
        initialValues.profilePhotos.map((image: string) => {
            const imageIndex = getImageIndex(image);
            console.log("imageIndex", imageIndex);
            if (imageIndex === -1) {
                return null;
            }
            return (
                <FormUpdate<Profile>
                    key={`${image.split('/').at(-1)}-${imageIndex}`}
                    inputs={profileUpdateImage.inputs}
                    tailwind="flex flex-col items-center"
                    intialValues={initialValues}
                    actionForm={(formData) =>
                        profileUpdateImage.action(
                            undefined,
                            formData,
                            resourceId,
                            imageIndex
                        )
                    }
                    schema={profileUpdateImage.schema}
                    title={profileUpdateImage.title}
                >
                    <MiddleText  tailwind="color-adminTx">
                        {`${profileUpdateImage.title} ${imageIndex + 1}`}
                    </MiddleText>
                    <img
                        className="w-40 h-40 rounded-full object-cover"
                        src={image}
                        alt={image.split('/').at(-1) || "developer"}
                    />
                </FormUpdate>
            )
        })
    )
}