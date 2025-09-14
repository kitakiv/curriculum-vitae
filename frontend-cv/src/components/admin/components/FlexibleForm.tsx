"use client"
import form from "@/variables/form/form";
import { ReactNode, useState } from "react";
import AdminButton from "@/components/button/AdminButton";
import FormElement from "@/components/form/Form";

export default function FlexibleForm({type = "edit", tailwind, initialValues, formInputs, submitFunction, schema, children }: { type: "add" | "edit" | "oneElement", tailwind?: string, initialValues: object, formInputs: object[], submitFunction: (values: object) => void, schema: object, children: ReactNode }) {
    const readonly = JSON.parse(JSON.stringify(formInputs.map((input) => {
        return { ...input, readonly: true }
    })))
    const notReadonly = formInputs;
    const [inputs, setInputs] = useState(readonly);


    return (
        <FormElement
            initialValues={initialValues}
            onSubmit={submitFunction}
            validationSchema={schema}
            inputs={type === "add" ? notReadonly : inputs}
            submitElement={<></>}
            tailwind={`${tailwind} bg-adminGr33 flex flex-col gap-2 relative`}
        >
            <>
                {children}

                {type === "add" ?
                    // show only button add
                    <AdminButton type="submit" tailwind='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 font-extrabold' click={() => setInputs(notReadonly)}>{form.moreInfoContent.buttonAdd}</AdminButton>
                    :
                    // show only edit and delete \\ cancel and save
                    <>
                    {inputs[0].readonly ?
                        <div className='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 flex gap-4 font-extrabold'>
                            <AdminButton tailwind="hidden" type="submit" >{form.moreInfoContent.buttonSave}</AdminButton>
                            <AdminButton click={() => setInputs(notReadonly)}>{form.moreInfoContent.buttonEdit}</AdminButton>
                        {type !== "oneElement" &&
                        // show edit and delete
                            <AdminButton >{form.moreInfoContent.buttonDelete}</AdminButton>
                        }
                        </div>
                        :
                        <div className='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 flex gap-4 font-extrabold'><AdminButton type="submit" >{form.moreInfoContent.buttonSave}</AdminButton>
                            <AdminButton click={() => setInputs(readonly)}>{form.moreInfoContent.buttonCancel}</AdminButton></div>
                    }
                    </>
                }

            </>
        </FormElement>
    )
}