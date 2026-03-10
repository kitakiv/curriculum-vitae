'use client'
import { Formik, Form, useFormikContext } from 'formik';
import InputElement from '@/components/Input/Input';
import { InputType } from '@/types/index';
import AdminButton from '@/components/button/AdminButton';
import { useActionState, useState, startTransition } from 'react';
import SmallText from '@/components/text/SmallText';
import { Resource, resourceConfig } from "@/variables/admin/resource";

interface FormElementProps {
    children?: React.ReactNode;
    tailwind?: string;
    resourceType: Resource;
}

export default function FormCreate({ children, tailwind, resourceType}: FormElementProps) {
    const contactObject = resourceConfig[resourceType].createForm;
    const formFields = contactObject?.inputs;
    const intialValues = contactObject?.initialValues;
    const formAction = contactObject?.action;
    const [state, action, pending] = useActionState(formAction, undefined);
    const schema = contactObject?.schema;
     console.log(schema);
    if (!formFields || !intialValues || !schema) {
        return null;
    }

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
                    action(formData)
                });
            }}
        >
            {({ setFieldValue }) => (
                <Form className={`${tailwind} bg-adminGr33 flex flex-col padding-elements gap-4 rounded-lg`}>
                    {children}
                    {state?.message && (
                        <SmallText tailwind={`text-center w-full ${state.success ? 'text-green-500' : 'text-red-500'}`}>
                            {state.message}
                        </SmallText>
                    )}
                    {formFields.map((input) => (
                        <InputElement
                            key={input.id}
                            inputData={input as InputType}
                            setFieldValue={setFieldValue}
                        />
                    ))}
                    <SubmitButton pending={pending} />
                </Form>
            )}
        </Formik>
    );
}
function SubmitButton({ pending }: { pending: boolean }) {
    const { errors, isValid } = useFormikContext();
    const hasErrors = Object.keys(errors).length > 0;
    const isDisabled = !isValid || hasErrors || pending;

    return (
        <AdminButton type="submit"
            disabled={isDisabled}
            pending={pending}
        >
            {pending ? 'Loading...' : 'Create'}
        </AdminButton>
    );
}
