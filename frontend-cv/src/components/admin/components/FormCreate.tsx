'use client'
import { Formik, Form, useFormikContext } from 'formik';
import InputElement from '@/components/Input/Input';
import { InputType } from '@/types/index';
import AdminButton from '@/components/button/AdminButton';
import React, { useActionState, startTransition } from 'react';
import SmallText from '@/components/text/SmallText';
import { PrevState } from '@/app/actions/action.type';
import CustomizedSnackbars from '@/components/animation/Alert';

interface FormElementProps<V> {
    children?: React.ReactNode;
    tailwind?: string;
    inputs: InputType[];
    intialValues: object;
    actionForm: (formData: FormData) => Promise<PrevState<V>>;
    schema: object;
    title: string;
}

export default function FormCreate<V>({ children, tailwind, inputs, intialValues, actionForm, schema, title }: FormElementProps<V>) {
    const [state, action, pending] = useActionState((prevState: PrevState<V> | undefined, formData: FormData) => actionForm(formData), undefined);

    return (
        <Formik
            initialValues={intialValues}
            validationSchema={schema}
            onSubmit={async (values) => {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                startTransition(() => {
                    if (action) {
                        action(formData);
                    }
                });
            }}
        >
            {({ setFieldValue }) => (
                <Form className={`${tailwind} bg-adminGr33 flex flex-col padding-elements gap-4 rounded-lg`}>
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
                        />
                    ))}
                    <SubmitButton pending={pending} >
                        {title}
                    </SubmitButton>
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
