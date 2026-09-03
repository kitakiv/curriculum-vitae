import { Profile } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "@/components/admin/components/FormUpdate";
import MainText from "@/components/text/MainText";

interface Props {
    initialValues: Profile,
    resourceId: string,
}

export default function UpdateFormProfile({initialValues, resourceId }: Props) {
    const profileUpdate = resourceConfig[Resource.PROFILE].editForm;
    return (
        <FormUpdate<Profile>
            inputs={profileUpdate.inputs}
            intialValues={initialValues}
            actionForm={(formData) =>
                profileUpdate.action(
                    undefined,
                    formData,
                    initialValues,
                    resourceId
                )
            }
            schema={profileUpdate.schema}
            title={profileUpdate.title}
        >
            <MainText tailwind="text-center">
                {profileUpdate.title}
            </MainText>
        </FormUpdate>
    )

}