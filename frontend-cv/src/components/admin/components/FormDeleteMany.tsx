'use client'
import { Formik, Form, useFormikContext } from 'formik';
import InputElement from '@/components/Input/Input';
import { InputType } from '@/types/index';
import AdminButton from '@/components/button/AdminButton';
import React, { useActionState, startTransition, useEffect } from 'react';
import SmallText from '@/components/text/SmallText';
import { PrevState } from '@/app/actions/action.type';
import CustomizedSnackbars from '@/components/animation/Alert';
import { useAppSelector } from '@/store/hooks'
import { resourceConfig, Resource } from '@/variables/admin/resource';
import MainText from '@/components/text/MainText';
import { useRouter } from 'next/navigation';
import { PrevStateFull } from '@/app/actions/action.type';

export default function FormDeleteMany({ tailwind, resourceId, currentResource }: { tailwind?: string, resourceId?: string, currentResource: Resource }) {
    const resource: keyof typeof resourceConfig = currentResource.toLowerCase() as keyof typeof resourceConfig;
    const resourceIds = useAppSelector(state => state.form.formDeleteMany.ids) as string[];
    const router = useRouter();
    const inputs = resourceConfig[resource].deleteManyForm ? resourceConfig[resource].deleteManyForm.inputs : [];
    const formInitialValues = resourceConfig[resource].deleteManyForm ? resourceConfig[resource].deleteManyForm.initialValues : {};
    const schema = resourceConfig[resource].deleteManyForm ? resourceConfig[resource].deleteManyForm.schema : null;
    const title = resourceConfig[resource].deleteManyForm ? resourceConfig[resource].deleteManyForm.title : '';
    // @ts-ignore
    const actionForm = resourceConfig[resource].deleteManyForm.action;
    // @ts-ignore
    const [state, action, pending] = useActionState(actionForm, undefined);
    // @ts-ignore
    const initialValues = {
        ...formInitialValues,
        ids: resourceIds
    };

    useEffect(() => {
        if (state?.success) {
            router.back();
            router.refresh();
        }
    }, [state?.success, router]);

     if (!resourceConfig[resource].deleteManyForm) {
        return <></>;
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async () => {
                const formData = new FormData();
                resourceIds.forEach((id) => {
                    formData.append('ids', id);
                })
                formData.append('resourceId', resourceId as string);
                startTransition(() => {
                    if (action) {
                        action(formData);
                    }
                });
            }}
        >
            {({ setFieldValue }) => (
                <Form className={`${tailwind} bg-adminGr33 flex flex-col padding-elements gap-4 rounded-lg relative`}>
                    <MainText tailwind="text-center">
                        {title}
                    </MainText>
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
                    <SubmitButton pending={pending}>
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

