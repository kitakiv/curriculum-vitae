import { CreateContactInput, Profile } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "../components/FormUpdate";
import MiddleText from "@/components/text/MiddleText";


interface Props {
    initialValues: Profile,
    resourceId: string,
}

export default function UpdateFormProfileImages({ initialValues, resourceId }: Props) {
    const profileUpdateImage = resourceConfig[Resource.PROFILE].editFormImages;
    console.log("profileUpdateImage", profileUpdateImage);
    return (
        <FormUpdate<Profile>
            inputs={profileUpdateImage.inputs}
            tailwind="flex flex-col items-center"
            intialValues={initialValues}
            actionForm={(formData) =>
                profileUpdateImage.action(
                    undefined,
                    formData,
                    resourceId
                )
            }
            schema={profileUpdateImage.schema}
            title={profileUpdateImage.title}
        >
            <MiddleText  tailwind="color-adminTx">
               !!!Important all previos images will be deleted
            </MiddleText>
        </FormUpdate>
    )
}