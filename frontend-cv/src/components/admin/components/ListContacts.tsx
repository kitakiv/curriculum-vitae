'use client'
import { FollowCard, FormType } from "@/types/index";
import MoreInfoBlock from "@/components/form/MoreInfoBlock";
import TitleContent from "./TitleContent";
import footer from "@/variables/footer/footer";
import project from "@/variables/projects/projects";
import form from "@/variables/form/form";
import schema from "@/validation/schemaValidation";
import FlexibleForm from "./FlexibleForm";
import MiddleText from "@/components/text/MiddleText";
import Image from "next/image";
import projects from "@/variables/projects/projects";
import AdminBorder from "@/components/border/AdminBorder";

export default function ListContacts({ contacts = footer.links, type = "edit" }: { contacts?: FollowCard[], type: FormType }) {
    const schemaForm = {
        "add": {
            schema: schema.contact.contactAdd,
            inputs: form.contactsForm.inputsAdd,
        },
        "edit": {
            schema: schema.contact.contactEdit,
            inputs: form.contactsForm.inputsEdit
        },
        "addImage": {
            schema: schema.contact.contactEditImage,
            inputs: form.contactsForm.inputsEditImage,
            type: "oneElement" as FormType
        }
    }
    const imageEdit = "addImage";

    function alertMessage(values: object) {
        alert(JSON.stringify(values));
    }

    const elements = contacts.map((item, index) => {
        const initialValues = { contactName: item.name, contactSvg: "", contactLink: item.link };
        if (type === "edit") {
            return (
                <MoreInfoBlock key={`${type}-contact-admin-${index}`} tailwind="px-4 py-2 flex flex-col"
                    titleChildren={<TitleContent tailwind='flex gap-2 items-center' title={item.name} image={item.svg || project.defaultImage} />}
                >
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1  padding-elements">
                    <FlexibleForm tailwind="padding-admin flex justify-center items-center" type={schemaForm[imageEdit].type || type} initialValues={initialValues} formInputs={schemaForm[imageEdit].inputs} submitFunction={alertMessage} schema={schemaForm[imageEdit].schema}>
                        <Image src={item.svg as string} style={{ backgroundImage: `url(${projects.defaultImage})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center start' }} alt="slider" width={1000} height={500} className="h-48 w-fit rounded-md"></Image>
                    </FlexibleForm>
                    <FlexibleForm tailwind="padding-admin" type={type} initialValues={initialValues} formInputs={schemaForm[type].inputs} submitFunction={alertMessage} schema={schemaForm[type].schema}>
                        <MiddleText tailwind='text-adminTx font-bold'>{form.contactsForm.title}</MiddleText>
                    </FlexibleForm>
                    </div>
                </MoreInfoBlock>)
        } else if (type === "add") {
            return (
                <AdminBorder key={`${type}-contact-admin-${index}`} >
                    <FlexibleForm tailwind="padding-elements" type={type}  initialValues={initialValues} formInputs={schemaForm[type].inputs} submitFunction={alertMessage} schema={schemaForm[type].schema}>
                        <MiddleText tailwind='text-adminTx font-bold'>{form.contactsForm.title}</MiddleText>
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