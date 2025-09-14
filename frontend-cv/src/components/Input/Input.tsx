import { Field, ErrorMessage as Error } from "formik";
import SmallText from "../text/SmallText";
import { InputType } from "@/types/index";

export default function InputElement({inputData}: {inputData: InputType}) {
    const {id, label, name, placeholder, type, readonly, as} = inputData
    return (
        <>
           {readonly && type === "file" ? null
           :
           <>
            {readonly ?
                 <><label htmlFor={id}><SmallText tailwind="text-adminTx">{label}</SmallText></label>
                 <Field className="w-full focus:outline-none border-2 border-zOpacity bg-adminGr0 text-adminTx100 px-2 py-3 rounded-md" type={type} name={name} id={id} placeholder={placeholder} readOnly={readonly}  as={as}/></>
             :
             <>
             <label htmlFor={id}><SmallText tailwind="text-footerTx">{label}</SmallText></label>
             <Field className="w-full transition-all duration-300 ease-in-out border-2 border-gray-300 rounded-xl px-2 py-3 bg-slate-100 hover:border-bg33 hover:bg-bg33 focus:bg-bg33 cursor-pointer focus:border-bg0 focus:outline-none" type={type} name={name} id={id} placeholder={placeholder} readOnly={readonly} as={as}/>
             <Error name={name}>{(error: string) => (<span className="text-red-500 lg:text-md md:text-sm text-sm transition-all duration-300 ease-in-out">{error}</span>)}</Error>
             </>
            }
           </>
        }
        </>
    )
}