'use client'
import { Formik, Form, useFormikContext } from 'formik';
import InputElement from '@/components/Input/Input';
import { InputType } from '@/types/index';
import AdminButton from '@/components/button/AdminButton';
import React, { useActionState, startTransition, useEffect } from 'react';
import SmallText from '@/components/text/SmallText';
import { PrevState, PrevStateFull } from '@/app/actions/action.type';
import CustomizedSnackbars from '@/components/animation/Alert';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

interface FormElementProps<V> {
    children?: React.ReactNode;
    tailwind?: string;
    inputs: InputType[];
    intialValues: object;
    actionForm: (formData: FormData) => Promise<PrevStateFull<V>> | Promise<PrevState<V>>;
    schema: object;
    title: string;
}

export default function FormUpdate<V>({ children, tailwind, inputs, intialValues, actionForm, schema, title }: FormElementProps<V>) {
    // @ts-ignore
    const [state, action, pending] = useActionState((prevState: PrevStateFull<V> | PrevState<V> | undefined, formData: FormData) => actionForm(formData), undefined);
    const [readonly, setReadonly] = React.useState(true);

    useEffect(() => {
            if (state?.success) {
                setReadonly(true);
            }
        }, [state]);

    return (
        <Formik
            initialValues={intialValues}
            validationSchema={schema}
            onSubmit={async (values) => {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    if (value instanceof Array) {
                        value.forEach((item) => {
                            formData.append(key, item);
                        });
                    }
                    else if (value instanceof File) {
                        formData.append(key, value);
                    }
                    else if (value instanceof Object) {
                        formData.append(key, JSON.stringify(value));
                    } else {
                        formData.append(key, value);
                    }
                });
                startTransition(() => {
                    if (action) {
                        // @ts-ignore
                        action(formData);
                    }
                });
            }}
        >
            {({ setFieldValue, resetForm, values }) => (
                <Form className={`${tailwind} bg-adminGr33 flex flex-col padding-elements gap-4 rounded-lg relative`}>
                    {children}
                    {state?.message && (
                        <>
                            <SmallText tailwind={`text-center w-full ${state.success ? 'text-green-500' : 'text-red-500'}`}>
                                {state.message}
                            </SmallText>
                            <CustomizedSnackbars open={true} success={state?.success || false}>
                                {state.message}
                            </CustomizedSnackbars>
                        </>

                    )}
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
                            <SubmitButton pending={pending}>{title}</SubmitButton>
                            <Button click={() => {
                                setReadonly(true)
                                resetForm();
                            }}><CancelIcon/></Button>
                        </div>
                    )}
                    {readonly && (
                        <div className='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 flex gap-4 font-extrabold'>
                            <Button click={() => setReadonly(false)}><EditIcon/></Button>
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

function Button({ children, click }: { children: React.ReactNode, click: () => void }) {
    return (
        <AdminButton type="button" click={click}
        >
            {children}
        </AdminButton>
    );
}
