"use client"
import form from "@/variables/form/form";
import { useState } from "react";
import MiddleText from "@/components/text/MiddleText";
import AdminButton from "@/components/button/AdminButton";
import FormElement from "@/components/form/Form";
import schema from "@/validation/schemaValidation";
import Image from "next/image";
import { ProjectCard } from "@/types/index";

export default function ProjectForm({ projectInfo, type = "edit", tailwind }: { projectInfo: ProjectCard, type: "add" | "edit", tailwind?: string }) {
    const { title, description, image, githubLink, demoLink } = projectInfo;
    const readonly = JSON.parse(JSON.stringify(form.projectForm.inputs.map((input) => {
        return { ...input, readonly: true }
    })))
    const notReadonly = form.projectForm.inputs;
    const [inputs, setInputs] = useState(readonly);


    return (
        <FormElement
            initialValues={
                {
                    projectTitle: title,
                    projectDescription: description,
                    projectGithubLink: githubLink,
                    projectDemoLink: demoLink,
                    projectImage: "",
                }
            }
            onSubmit={() => { alert('submit') }}
            validationSchema={schema.project}
            inputs={type === "add" ? form.projectForm.inputs : inputs}
            submitElement={<></>}
            tailwind={`${tailwind} bg-adminGr33 flex flex-col gap-2 relative`}
        >
            <>
                <MiddleText tailwind='text-adminTx font-bold'>{form.projectForm.title}</MiddleText>
                {type === "edit" &&
                    <Image src={image as string} alt="slider" width={1000} height={500} className="h-48 w-fit rounded-md"></Image>
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