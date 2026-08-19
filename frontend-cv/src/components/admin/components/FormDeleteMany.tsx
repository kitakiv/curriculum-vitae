'use client'
import { Formik, Form, useFormikContext } from 'formik';
import InputElement from '@/components/Input/Input';
import { InputType } from '@/types/index';
import AdminButton from '@/components/button/AdminButton';
import React, { useActionState, startTransition, useEffect } from 'react';
import SmallText from '@/components/text/SmallText';
import { PrevState } from '@/app/actions/action.type';
import CustomizedSnackbars from '@/components/animation/Alert';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { resourceConfig } from '@/variables/admin/resource';
import { Resource } from '@/variables/admin/resource';
import MainText from '@/components/text/MainText';
import { useRouter } from 'next/navigation';

export default function FormDeleteMany({ tailwind, resourceId, currentResource }: { tailwind?: string, resourceId?: string, currentResource: Resource }) {
    const resource = currentResource.toLowerCase();
    const resourceIds = useAppSelector(state => state.form.formDeleteMany.ids) as string[];
    const inputs = resourceConfig[resource].deleteManyForm.inputs as InputType[];
    const formInitialValues = resourceConfig[resource].deleteManyForm.initialValues;
    const actionForm = resourceConfig[resource].deleteManyForm.action;
    const router = useRouter();
    const initialValues = {
        ...formInitialValues,
        ids: resourceIds
    };
    const [state, action, pending] = useActionState(actionForm, undefined);

    useEffect(() => {
        if (state?.success) {
            router.back();
            router.refresh();
        }
    }, [state?.success, router])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={resourceConfig[resource.toLowerCase()].deleteManyForm.schema}
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
                        {resourceConfig[resource].deleteManyForm.title}
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
                        {resourceConfig[resource.toLowerCase()].deleteManyForm.title}
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

