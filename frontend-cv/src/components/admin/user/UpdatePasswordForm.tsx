'use client'

import {  resourceConfig } from "@/variables/admin/resource";
import FormUpdate from "@/components/admin/components/FormUpdate";
import { adminVariables } from "@/variables/admin/resource";
import { redirect } from "next/navigation";
export default function UpdatePasswordForm() {
   const changePassword = resourceConfig.changePassword;
    const initialValuesEmpty = changePassword.profileInitialValues;
    const  inputs = changePassword.profileInputs;
    return (
        <FormUpdate
            inputs={inputs}
            intialValues={initialValuesEmpty}
            actionForm={(_) =>
               redirect(adminVariables.changePassword.path)
            }
            schema={{}}
            title={"Change Password"}
        >
        </FormUpdate>
    )

}