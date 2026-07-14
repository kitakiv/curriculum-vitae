import { Field, ErrorMessage as Error, useFormikContext } from "formik";
import { InputType } from "@/types/index";
import { useState, useCallback } from "react"
import MiddleText from "../text/MiddleText";
import { useDropzone } from 'react-dropzone'
import SmallText from "../text/SmallText";
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

interface Props {
    inputData: InputType,
    setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => Promise<void | object>,
    values?: object
    readonly?: boolean
}

export default function InputElement({ inputData, setFieldValue, readonly = false, values }: Props) {
    const { id, label, name, placeholder, type, as, tableHeader, tableLeftColumn } = inputData;
    const [_, setHasError] = useState<boolean>(false)
    const { errors, touched } = useFormikContext<any>();
    const [fileImages, setFileImages] = useState<{ file: File; preview: string; }[]>([]);
    const onDrop = useCallback((acceptedFiles: File[]) => {

        //type file
        if (type === 'file') {
            const file = acceptedFiles[0];
            if (file) {
                if (file instanceof File) {
                    setFieldValue(name, file);
                    if (!errors[name]) {
                        setHasError(false);
                        const fileWithPreview = {
                            file,
                            preview: URL.createObjectURL(file),
                        };
                        setFileImages([fileWithPreview]);

                    } else {
                        setHasError(true);
                    }
                }
            }
        }

        // type files
        if (type === 'files') {
            const files = acceptedFiles;
            if (files) {
                if (files instanceof Array) {
                    setFieldValue(name, files);
                    if (!errors[name]) {
                        setHasError(false);
                        const filesWithPreview = files.map((file) => ({
                            file,
                            preview: URL.createObjectURL(file),
                        }));
                        setFileImages(filesWithPreview);
                    } else {
                        setHasError(true);
                    }
                }
            }
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
    if (type === "files" && readonly) return null;
    // type file and !readonly
    if (type === "files" && !readonly) {
        return (
            <>
                <label htmlFor={id}>
                    <MiddleText tailwind="text-footerTx">
                        {label}
                    </MiddleText>
                </label>
                <div className={`w-full min-h-40 transition-all duration-300 ease-in-out border-2 rounded-xl px-2 py-3 bg-adminGr0 cursor-pointer border-dashed focus:outline-none ${errors[name] && touched[name] ? 'border-red-500 placeholder-red-500 hover:border-red-600 focus:border-red-600' : 'border-gray-300 text-footerTx hover:border-bg33 hover:bg-bg33 focus:bg-bg33 focus:border-bg0'}`} {...getRootProps()}>
                    <input name={name} id={id}  {...getInputProps()} />
                    {

                        isDragActive ?
                            <SmallText tailwind="text-footerTx ">Drop the files here ...</SmallText> :
                            <SmallText tailwind="text-footerTx">Drag &apos;n&apos; drop some files here, or click to select files</SmallText>
                    }
                    {!errors[name] && fileImages.length > 0 &&
                        fileImages.map((file, index) => (
                            <div key={`file-${name}-${index}`}>
                                <SmallText tailwind="text-footerTx">{file.file.name}</SmallText>
                            </div>
                        ))
                    }

                </div>
                <span className={`${errors[name] && touched[name] ? 'text-red-500' : 'hidden'} transition-all duration-300 ease-in-out`}>{handleError(errors[name] as string)}</span>
            </>
        )
    }
    else if (type === "file" && !readonly) {

        return (
            <>
                <label htmlFor={id}>
                    <MiddleText tailwind="text-footerTx">
                        {label}
                    </MiddleText>
                </label>
                <div className={`w-full min-h-40 transition-all duration-300 ease-in-out border-2 rounded-xl px-2 py-3 bg-adminGr0 cursor-pointer border-dashed focus:outline-none ${errors[name] ? 'border-red-500 placeholder-red-500 hover:border-red-600 focus:border-red-600' : 'border-gray-300 text-footerTx hover:border-bg33 hover:bg-bg33 focus:bg-bg33 focus:border-bg0'}`} {...getRootProps()}>
                    <input name={name} id={id}  {...getInputProps()} />
                    {

                        isDragActive ?
                            <SmallText tailwind="text-footerTx">Drop the file here ...</SmallText> :
                            <SmallText tailwind="text-footerTx">Drag &apos;n&apos; drop a file here, or click to select a file</SmallText>
                    }
                    {!errors[name] && fileImages.length > 0 &&
                        fileImages.map((file, index) => (
                            <div key={`file-${name}-${index}`}>
                                <SmallText tailwind="text-footerTx">{file.file.name}</SmallText>
                            </div>
                        ))
                    }

                </div>
                <span className={`${errors[name] && touched[name] ? 'text-red-500' : 'hidden'} transition-all duration-300 ease-in-out`}>{handleError(errors[name] as string)}</span>
            </>
        )
    }

    if (type === "checkbox" && inputData.options) {
        return (
            <>
                <label htmlFor={id}><MiddleText tailwind="text-footerTx">{label}</MiddleText></label>
                {inputData.options.map((option) => (
                    <div key={`option-${name}-${option.value}`}>
                        <label className="text-adminTx100">
                            <Field className="checked:bg-txFirst100 indeterminate:bg-adminTx100" type="checkbox" name={name} id={option.value} disabled={readonly} value={option.value} />
                            {option.label}
                        </label>
                    </div>
                ))}
                <span className={`${errors[name] && touched[name] ? 'text-red-500' : 'hidden'} transition-all duration-300 ease-in-out`}>{handleError(errors[name] as string)}</span>
            </>
        )
    }


    // table input
    else if (type === "table" && tableHeader && tableLeftColumn) {
        return (
            <>
                <label htmlFor={id}>
                    <MiddleText tailwind="text-footerTx">
                        {label}
                    </MiddleText>
                </label>
                <Table sx={{ position: 'relative', background: 'linear-gradient(var(--admin-gr33), var(--admin-gr100))' }}>
                    <TableHead sx={{ position: 'sticky', top: 100, zIndex: 1, backgroundColor: 'var(--admin-gr33)' }}>
                        <TableRow sx={{ backgroundColor: 'var(--admin-gr33)' }}>
                            <TableCell>
                                <MiddleText tailwind="text-footerTx">{placeholder}</MiddleText>
                            </TableCell>
                            {tableHeader.map(action => (
                                <TableCell key={action}>
                                    <MiddleText tailwind="text-footerTx">{action.toUpperCase()}</MiddleText>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tableLeftColumn.map(resource => (
                            <TableRow key={resource}>
                                <TableCell>
                                    <MiddleText tailwind="text-footerTx">{resource}</MiddleText>
                                </TableCell>

                                {tableHeader.map(action => {
                                    const fieldName = `${id}.${resource}.${action}`;

                                    return (
                                        <TableCell key={action}>
                                            <Checkbox
                                                sx={{
                                                    color: 'var(--admin-tx0)',
                                                    '&.Mui-checked': {
                                                        color: 'var(--admin-tx0)',
                                                    },
                                                    '&.Mui-disabled': {
                                                        color: 'var(--admin-tx100)',
                                                    },
                                                }}
                                                disabled={readonly}
                                                // @ts-ignore
                                                checked={values[id][resource][action]}
                                                onChange={() =>
                                                    setFieldValue(
                                                        fieldName,
                                                        // @ts-ignore
                                                        !values[id][resource][action]
                                                    )
                                                }
                                            />
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Error name={name}>{handleError}</Error>
            </>
        )
    }
      // readonly 
    else if (type !== "file" && readonly) {
        return (<>
            <label htmlFor={id}>
                <MiddleText tailwind="text-adminTx">{label}</MiddleText>
            </label>
            <Field className="w-full focus:outline-none border-2 border-zOpacity bg-adminGr0 text-adminTx100 px-2 py-3 rounded-md" type={type} name={name} id={id} placeholder={placeholder} readOnly={readonly} as={as} />
        </>)
    }
    // 
    else if (type !== "file" && !readonly) {
        return (
            <>
                <label htmlFor={id}><MiddleText tailwind="text-footerTx">{label}</MiddleText></label>
                <Field className={`w-full transition-all duration-300 ease-in-out border-2 rounded-xl px-2 py-3 bg-adminGr0 cursor-pointer focus:outline-none ${errors[name] && touched[name] ? 'border-red-500 placeholder-red-500 hover:border-red-600 focus:border-red-600' : 'border-gray-300 text-footerTx hover:border-bg33 hover:bg-bg33 focus:bg-bg33 focus:border-bg0'}`} type={type} name={name} id={id} placeholder={placeholder} readOnly={readonly} as={as} />
                <Error name={name}>{handleError}</Error>
            </>
        )
    }
    return null
}
