"use client"
import form from "@/variables/form/form";
import { useState } from "react";
import MiddleText from "@/components/text/MiddleText";
import AdminButton from "@/components/button/AdminButton";
import FormElement from "@/components/form/Form";
import schema from "@/validation/schemaValidation";
import Image from "next/image";

export default function SliderForm({ sliderInfo, type = "edit", tailwind }: { sliderInfo: { title: string, text: string, image: string }, type: "add" | "edit", tailwind?: string }) {
    const { title, text, image } = sliderInfo;
    const readonly = JSON.parse(JSON.stringify(form.sliderForm.inputs.map((input) => {
        return { ...input, readonly: true }
    })))
    const notReadonly = form.sliderForm.inputs;
    const [inputs, setInputs] = useState(readonly);


    return (
        <FormElement
            initialValues={
                {
                    sliderName: title, sliderText: text, sliderImage: ""
                }
            }
            onSubmit={() => { alert('submit') }}
            validationSchema={schema.slider}
            inputs={type === "add" ? form.sliderForm.inputs : inputs}
            submitElement={<></>}
            tailwind={`${tailwind} bg-adminGr33 flex flex-col gap-2 relative`}
        >
            <>
                <MiddleText tailwind='text-adminTx font-bold'>{form.sliderForm.title}</MiddleText>
                {type === "edit" &&
                    <Image src={image} alt="slider" width={1000} height={500} className="h-48 w-fit rounded-md"></Image>
                }

                {type === "add" ?
                    <AdminButton type="submit" tailwind='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 font-extrabold' click={() => setInputs(notReadonly)}>{form.moreInfoContent.buttonAdd}</AdminButton>
                    :
                    <>{inputs[0].readonly ?
                        <div className='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 flex gap-4 font-extrabold'><AdminButton click={() => setInputs(notReadonly)}>{form.moreInfoContent.buttonEdit}</AdminButton>
                            <AdminButton >{form.moreInfoContent.buttonDelete}</AdminButton></div>
                        :
                        <div className='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 flex gap-4 font-extrabold'><AdminButton type="submit">{form.moreInfoContent.buttonSave}</AdminButton>
                            <AdminButton click={() => setInputs(readonly)}>{form.moreInfoContent.buttonCancel}</AdminButton></div>
                    }</>
                }

            </>
        </FormElement>
    )
}