import { Field, ErrorMessage as Error, useFormikContext } from "formik";
import SmallText from "../text/SmallText";
import { InputType } from "@/types/index";
import { useState, useEffect } from "react"
import MiddleText from "../text/MiddleText";

export default function InputElement({ inputData, setFieldValue }: { inputData: InputType, setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => Promise<void | object> }) {
    const { id, label, name, placeholder, type, readonly, as } = inputData;
    const [hasError, setHasError] = useState<boolean>(false)
    const { errors, touched } = useFormikContext<any>();
    
    useEffect(() => {
        if (errors[name] && touched[name]) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    }, [errors, touched, name]);
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (type === "file") {
            const file = event.target.files?.[0];
            if (file) {
                setFieldValue(name, file);
            }
        }
    }

    function handleError(error: string | undefined) {
        if (error) {
            return (
                <span className="text-red-500 lg:text-md md:text-sm text-sm transition-all duration-300 ease-in-out">
                    {error}
                </span>
            )
        }
        return null;
    }
    // type file and readonly
    if (type === "file" && readonly) return null;

    // type file and !readonly
    else if (type === "file" && !readonly) {
        return (
            <>
                <label htmlFor={id}>
                    <SmallText tailwind="text-footerTx">
                        {label}
                    </SmallText>
                </label>
                <input className={`w-full transition-all duration-300 ease-in-out border-2 rounded-xl px-2 py-3 bg-adminGr0 cursor-pointer focus:outline-none ${hasError ? 'border-red-500 placeholder-red-500 hover:border-red-600 focus:border-red-600' : 'border-gray-300 text-footerTx hover:border-bg33 hover:bg-bg33 focus:bg-bg33 focus:border-bg0'}`} type={type} name={name} id={id} placeholder={placeholder} readOnly={readonly} onChange={handleChange} />
                <Error name={name}>{handleError}</Error>
            </>
        )
    }
    // readonly 
    else if (type !== "file" && readonly) {
        return (<>
            <label htmlFor={id}>
                <SmallText tailwind="text-adminTx">{label}</SmallText>
            </label>
            <Field className="w-full focus:outline-none border-2 border-zOpacity bg-adminGr0 text-adminTx100 px-2 py-3 rounded-md" type={type} name={name} id={id} placeholder={placeholder} readOnly={readonly} as={as} />
        </>)
    }
    // 
    else if (type !== "file" && !readonly) {
        return (
            <>
                <label htmlFor={id}><MiddleText tailwind="text-footerTx">{label}</MiddleText></label>
                <Field className={`w-full transition-all duration-300 ease-in-out border-2 rounded-xl px-2 py-3 bg-adminGr0 cursor-pointer focus:outline-none ${hasError ? 'border-red-500 placeholder-red-500 hover:border-red-600 focus:border-red-600' : 'border-gray-300 text-footerTx hover:border-bg33 hover:bg-bg33 focus:bg-bg33 focus:border-bg0'}`} type={type} name={name} id={id} placeholder={placeholder} readOnly={readonly} as={as} />
                <Error name={name}>{handleError}</Error>
            </>
        )
    }
    return null
}