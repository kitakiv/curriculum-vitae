'use client'
import { Formik, Form, useFormikContext } from 'formik';
import InputElement from '@/components/Input/Input';
import { InputType } from '@/types/index';
import AdminButton from '@/components/button/AdminButton';
import React, { useActionState, startTransition, useEffect } from 'react';
import SmallText from '@/components/text/SmallText';
import { PrevState, PrevStateFull } from '@/app/actions/action.type';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

interface FormElementProps<V> {
    children?: React.ReactNode;
    tailwind?: string;
    inputs: InputType[];
    intialValues: object;
    actionForm: (formData: FormData, type: string) => Promise<PrevStateFull<V>>;
    schema: object;
    title: string;
}

export default function FormUpdateOneImage<V>({ children, tailwind, inputs, intialValues, actionForm, schema, title }: FormElementProps<V>) {
    const [state, action, pending] = useActionState((prevState: PrevStateFull<V> | undefined, formData: FormData) => {
        const type = formData.get('formType') as string;
        return actionForm(formData, type);
    }, undefined);
    const [readonly, setReadonly] = React.useState(true);


    useEffect(() => {
        if (state?.success) {
            setReadonly(true);
        }
    }, [state]);
    return (
        <Formik
            initialValues={intialValues}
            validationSchema={readonly ? null : schema}
            onSubmit={async (values) => {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    if (value instanceof Array) {
                        value.forEach((item) => {
                            formData.append(key, item);
                        });
                    } else {
                        formData.append(key, value);
                    }
                });
                const formType = readonly ? 'delete' : 'update';
                formData.append('formType', formType);
                startTransition(() => {
                    if (action) {
                        action(formData);
                    }
                });
            }}
        >
            {({ setFieldValue, resetForm, values }) => (
                <Form className={`${tailwind} bg-adminGr33 flex flex-col padding-elements gap-4 rounded-lg relative`}>
                    {children}
                    {inputs.map((input) => (
                        <InputElement
                            key={input.id}
                            inputData={input as InputType}
                            setFieldValue={setFieldValue}
                            readonly={readonly}
                            values={values}
                        />
                    ))}
                    {!readonly && (
                        <div className='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 flex gap-4 font-extrabold'>
                            <SubmitButton pending={pending}><CheckIcon/></SubmitButton>
                            <Button click={() => {
                                setReadonly(true)
                                resetForm();
                            }}>
                                <CancelIcon/>
                            </Button>
                        </div>
                    )}
                    {readonly && (
                        <div className='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 flex gap-4 font-extrabold'>
                            <Button click={() => setReadonly(false)}><EditIcon/></Button>
                            <SubmitDeleteButton pending={pending}><DeleteIcon/></SubmitDeleteButton>
                        </div>
                    )}
                    
                </Form>
            )}
        </Formik>
    );
}
function SubmitButton({ pending, children }: { pending: boolean, children: React.ReactNode }) {
    const { errors, isValid } = useFormikContext();
    const hasErrors = Object.keys(errors).length > 0;
    const isDisabled = !isValid || hasErrors || pending;

    return (
        <AdminButton type="submit"
            disabled={isDisabled}
            pending={pending}
        >
            {pending ? 'Loading...' : children}
        </AdminButton>
    );
}

function SubmitDeleteButton({ pending, children }: { pending: boolean, children: React.ReactNode }) {
    const { errors, isValid } = useFormikContext();
    const hasErrors = Object.keys(errors).length > 0;
    const isDisabled = !isValid || hasErrors || pending;

    return (
         <AdminButton type="submit"
            disabled={isDisabled}
            pending={pending}
        >
            {pending ? 'Loading...' : children}
        </AdminButton>
    );
}

function Button({ children, click }: { children: React.ReactNode, click: () => void }) {
    return (
        <AdminButton type="button" click={click}
        >
            {children}
        </AdminButton>
    );
}
