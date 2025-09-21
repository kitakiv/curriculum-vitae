"use client"
import form from "@/variables/form/form";
import { useState } from "react";
import MiddleText from "@/components/text/MiddleText";
import AdminButton from "@/components/button/AdminButton";
import FormElement from "@/components/form/Form";
import schema from "@/validation/schemaValidation";
import Image from "next/image";
import { FollowCard } from "@/types/index";
import projects from "@/variables/projects/projects";

export default function ContactForm({ contactInfo, type = "edit", tailwind }: { contactInfo: FollowCard, type: "add" | "edit", tailwind?: string }) {
    const { name, svg, link } = contactInfo;
    const readonly = JSON.parse(JSON.stringify(form.contactsForm.inputs.map((input) => {
        return { ...input, readonly: true }
    })))
    const notReadonly = form.contactsForm.inputs;
    const [inputs, setInputs] = useState(readonly);


    return (
        <FormElement
            initialValues={
                {
                    contactName: name,
                    contactSvg: "",
                    contactLink: link
                }
            }
            onSubmit={() => { alert('submit') }}
            validationSchema={schema.contact}
            inputs={type === "add" ? form.contactsForm.inputs : inputs}
            submitElement={<></>}
            tailwind={`${tailwind} bg-adminGr33 flex flex-col gap-2 relative`}
        >
            <>
                <MiddleText tailwind='text-adminTx font-bold'>{form.contactsForm.title}</MiddleText>
                {type === "edit" &&
                    <Image src={svg as string}  style={{backgroundImage: `url(${projects.defaultImage})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center start'}} alt="slider" width={1000} height={500} className="h-48 w-fit rounded-md"></Image>
                }

                {type === "add" ?
                    <AdminButton type="submit" tailwind='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 font-extrabold' click={() => setInputs(notReadonly)}>{form.moreInfoContent.buttonAdd}</AdminButton>
                    :
                    <>{inputs[0].readonly ?
                        <div className='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 flex gap-4 font-extrabold'><AdminButton click={() => setInputs(notReadonly)}>{form.moreInfoContent.buttonEdit}</AdminButton>
                            <AdminButton >{form.moreInfoContent.buttonDelete}</AdminButton></div>
                        :
                        <div className='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 flex gap-4 font-extrabold'><AdminButton type="submit" >{form.moreInfoContent.buttonSave}</AdminButton>
                            <AdminButton click={() => setInputs(readonly)}>{form.moreInfoContent.buttonCancel}</AdminButton></div>
                    }</>
                }

            </>
        </FormElement>
    )
}