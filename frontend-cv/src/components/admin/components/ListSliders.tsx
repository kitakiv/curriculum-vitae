'use client'
import { FormType, SliderText } from "@/types/index";
import { imagesDefault, imagesTitle } from "@/variables/aboutme/aboutme";
import MoreInfoBlock from "@/components/form/MoreInfoBlock";
import TitleContent from "./TitleContent";
import FlexibleForm from "./FlexibleForm";
import MiddleText from "@/components/text/MiddleText";
import Image from "next/image";
import form from "@/variables/form/form";
import project from "@/variables/projects/projects";
import schema from "@/validation/schemaValidation";
import AdminBorder from "@/components/border/AdminBorder";

export default function ListSliders({ images = imagesDefault, titles = imagesTitle, type }: { images?: string[], titles?: SliderText[], type: FormType }) {
    const schemaForm = {
        "add": {
            schema: schema.slider.sliderAdd,
            inputs: form.sliderForm.inputsAdd,
        },
        "edit": {
            schema: schema.slider.sliderEdit,
            inputs: form.sliderForm.inputsEdit
        },
        "addImage": {
            schema: schema.slider.sliderImage,
            inputs: form.sliderForm.inputsEditImage,
            type: "oneElement" as FormType
        }
    }
    const imageEdit = "addImage";
    function alertMessage(values: object) {
        alert(JSON.stringify(values));
    }

    const elements = titles.map((item, index) => {
        const initialValues = type === "edit" ? { sliderText: item.text, sliderName: item.title } : { sliderText: item.text, sliderName: item.title, sliderImage: "" };
        if (type === "edit") {
            return (
            <MoreInfoBlock key={`${type}-slider-admin-${index}`} tailwind="px-4 py-2 flex flex-col"
                titleChildren={<TitleContent tailwind='flex gap-2 items-center' title={item.title} image={images[index] || project.defaultImage} />}>
                <div className="grid grid-cols-2 padding-elements">
                <FlexibleForm type={schemaForm[imageEdit].type || type} initialValues={initialValues} formInputs={schemaForm[imageEdit].inputs} submitFunction={alertMessage} schema={schemaForm[imageEdit].schema}>
                    <Image src={images[index]} alt="slider" width={1000} height={500} className="h-48 w-fit rounded-md"></Image>
                </FlexibleForm>
                <FlexibleForm type={type} initialValues={initialValues} formInputs={schemaForm[type].inputs} submitFunction={alertMessage} schema={schemaForm[type].schema}>
                    <MiddleText tailwind='text-adminTx font-bold'>{form.sliderForm.title}</MiddleText>
                </FlexibleForm>
                </div>
            </MoreInfoBlock>)
        } else if (type === "add") {
            return (
                <AdminBorder key={`slider-admin-${index}`} >
                    <FlexibleForm tailwind="padding-elements" type={type} initialValues={initialValues} formInputs={schemaForm[type].inputs} submitFunction={alertMessage} schema={schemaForm[type].schema}>
                        <MiddleText tailwind='text-adminTx font-bold'>{form.sliderForm.title}</MiddleText>
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
