'use client'
import { User } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "@/components/admin/components/FormUpdate";
import { useState } from "react";
import { GetUserMutation } from "@/gql/graphql";


interface Props {
    initialValues: GetUserMutation['getUser'] | false,
    resourceId: string,
}

export default function UpdateFormUserImage({ initialValues, resourceId }: Props) {
    const updateUserImage = resourceConfig[Resource.USER].editFormImage;
    const intialValuesEmpty = updateUserImage.initialValues;
    // @ts-ignore
    const [ image, setImage ] = useState(initialValues.avatarPhoto);
    return (
        <FormUpdate<User["avatarPhoto"] | null>
            inputs={updateUserImage.inputs}
            tailwind="flex flex-col items-center"
            intialValues={intialValuesEmpty}
            actionForm={async (formData: FormData) => {
                // @ts-ignore
                const res = await updateUserImage.action(undefined, formData, resourceId);
                if (res.success && res.data) {
                    setImage(res.data);
                }
                return res;
            }
            }
            schema={updateUserImage.schema}
            title={updateUserImage.title}
        >   
           <img src={image as string} alt={"profile-photo"} className="w-72 h-fit rounded-full" />
        </FormUpdate>
    )
}