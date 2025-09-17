'use client'
import Image from "next/image";
import FlexibleForm from "./FlexibleForm";
import form from "@/variables/form/form";
import AdminBorder from "@/components/border/AdminBorder";
import schema from "@/validation/schemaValidation";
export default function AdminImage({ tailwind, path, alt }: { tailwind?: string, path: string, alt?: string }) {
    function alertMessage(values: object) {
        console.log(values);
        console.log(values.mainImage);
        alert(JSON.stringify(values));
    }
    return (
        <AdminBorder >
        <FlexibleForm type="oneElement" tailwind="padding-elements" initialValues={{ mainImage: "/" }} formInputs={form.mainImageForm.inputs} submitFunction={alertMessage} schema={schema.mainImage} >
            <div className=" flex justify-center items-center col-span-2 transition duration-700  group  lg:w-80 lg:h-80 sm:w-80 sm:h-80 w-56 h-56">
                <Image src={path} alt={alt || "developer"} width={320} height={320} className={`${tailwind} transition-all duration-700 bg-bg0 rounded-full z-10 stroke-bg100 object-cover w-full h-full`} />
            </div>
        </FlexibleForm>
        </AdminBorder >

    )
}

