import { FormType, ProjectCard } from "@/types/index";
import MoreInfoBlock from "@/components/form/MoreInfoBlock";
import TitleContent from "./TitleContent";
import FlexibleForm from "./FlexibleForm";
import { demoProject, anoutherDemoProject } from "@/variables/projects/projects";
import project from "@/variables/projects/projects";
import form from "@/variables/form/form";
import schema from "@/validation/schemaValidation";
import MiddleText from "@/components/text/MiddleText";
import Image from "next/image";
import AdminBorder from "@/components/border/AdminBorder";

export default function ListProjects({ projects = [demoProject, anoutherDemoProject], type = "edit" }: { projects?: ProjectCard[], type: FormType }) {
    const schemaForm = {
        "add": {
            schema: schema.project.projectAdd,
            inputs: form.projectForm.inputsAdd,
        },
        "edit": {
            schema: schema.project.projectEdit,
            inputs: form.projectForm.inputsEdit
        },
        "addImage": {
            schema: schema.project.projectEditImage,
            inputs: form.projectForm.inputsEditImage
        }
    }
    const imageEdit = "addImage";
    
    function alertMessage(values: object) {
        alert(JSON.stringify(values));
    }

    const elements = projects.map((item, index) => {
        const initialValues = type === "add"? { projectTitle: item.title, projectDescription: item.description, projectImage: null, projectGithubLink: item.githubLink, projectDemoLink: item.demoLink } 
        : { projectTitle: item.title, projectDescription: item.description, projectGithubLink: item.githubLink, projectDemoLink: item.demoLink };
        if (type === "edit") {
            return (<MoreInfoBlock key={`${type}-project-admin-${index}`} tailwind="px-4 py-2 flex flex-col"
                titleChildren={<TitleContent tailwind='flex gap-2 items-center' title={item.title} image={item.image || project.defaultImage} />}
            >
                <FlexibleForm type={type} initialValues={initialValues} formInputs={schemaForm[type].inputs} submitFunction={alertMessage} schema={schemaForm[type].schema}>
                    <MiddleText tailwind='text-adminTx font-bold'>{form.projectForm.title}</MiddleText>
                </FlexibleForm>
                <FlexibleForm type={type} initialValues={initialValues} formInputs={schemaForm[imageEdit].inputs} submitFunction={alertMessage} schema={schemaForm[imageEdit].schema}>
                    <Image src={item.image as string} alt="slider" width={1000} height={500} className="h-48 w-fit rounded-md"></Image>
                </FlexibleForm>
            </MoreInfoBlock>)
        } else if (type === "add") {
            return (
                <AdminBorder key={`project-admin-${index}`} >
                    <FlexibleForm tailwind="padding-elements" type={type} initialValues={initialValues} formInputs={schemaForm[type].inputs} submitFunction={alertMessage} schema={schemaForm[type].schema}>
                        <MiddleText tailwind='text-adminTx font-bold'>{form.projectForm.title}</MiddleText>
                    </FlexibleForm>
                </AdminBorder>
            )
        }
        return <></>
    });

    return (
        <>
            {elements}
        </>
    )
}