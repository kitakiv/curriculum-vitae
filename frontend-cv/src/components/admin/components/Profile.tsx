'use client'
import FormElement from '@/components/form/Form';
import form from '@/variables/form/form';
import schema from '@/validation/schemaValidation';
import { useState } from 'react';
import AdminBorder from '@/components/border/AdminBorder';
import MiddleText from '@/components/text/MiddleText';
import AdminButton from '@/components/button/AdminButton';



export default function Profile() {
    const readonly = JSON.stringify(form.profileForm.inputs.map((input) => {
        return {...input, readonly: true}
    }));
    const notReadonly = form.profileForm.inputs;
    const [inputs, setInputs] = useState(JSON.parse(readonly));
    return (
            <AdminBorder tailwind='padding-elements relative'>
            <FormElement
            initialValues={form.profileForm.initialValues}
            onSubmit={() => {alert('submit')}}
            validationSchema={schema.profile}
            inputs={inputs}
            submitElement={<></>}
            tailwind="bg-adminGr33 flex flex-col gap-2"
            >
            <>
            <MiddleText tailwind='text-adminTx font-bold'>{form.profileForm.title}</MiddleText>
            {inputs[0].readonly ?
                <AdminButton tailwind='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 font-extrabold' click={() => setInputs(notReadonly)}>{form.moreInfoContent.buttonEdit}</AdminButton>
                :
                <div className='absolute top-2 lg:right-4 md:right-4 sm:right-3 right-2 flex gap-4 font-extrabold'><AdminButton click={() => setInputs(JSON.parse(readonly))}>{form.moreInfoContent.buttonSave}</AdminButton>
                <AdminButton  click={() => setInputs(notReadonly)}>{form.moreInfoContent.buttonCancel}</AdminButton></div>
            }
            </>
            </FormElement>
            </AdminBorder>
    )
}