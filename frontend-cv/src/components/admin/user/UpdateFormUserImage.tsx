'use client'
import { User } from "@/gql/graphql";
import { Resource, resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "../components/FormUpdate";
import { useState } from "react";


interface Props {
    initialValues: User,
    resourceId: string,
}

export default function UpdateFormUserImage({ initialValues, resourceId }: Props) {
    const updateUserImage = resourceConfig[Resource.USER].editFormImage;
    const intialValuesEmpty = updateUserImage.initialValues;
    const [ image, setImage ] = useState(initialValues.avatarPhoto);
    return (
        <FormUpdate<User["avatarPhoto"]>
            inputs={updateUserImage.inputs}
            tailwind="flex flex-col items-center"
            intialValues={intialValuesEmpty}
            actionForm={async (formData) => {
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
           <img src={image as string} alt={intialValuesEmpty.avatarPhoto} className="w-72 h-fit rounded-lg" />
        </FormUpdate>
    )
}