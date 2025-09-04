import { Field, ErrorMessage as Error } from "formik";
import SmallText from "../text/SmallText";

export default function InputElement({id, label, name, placeholder, type}: {id: string, label: string, name: string, placeholder: string, type: string}) {
    return (
        <>
            <label htmlFor={id}><SmallText tailwind="text-footerTx">{label}</SmallText></label>
            <Field className="transition-all duration-300 ease-in-out border-2 border-gray-300 rounded-xl p-2 bg-slate-100 hover:border-bg33 hover:bg-bg33 focus:bg-bg33 cursor-pointer focus:border-bg33" type={type} name={name} id={id} placeholder={placeholder} />
            <Error name={name} >{(error: string) => (<span className="text-red-500 lg:text-md md:text-sm text-sm transition-all duration-300 ease-in-out">{error}</span>)}</Error>
        </>
    )
}