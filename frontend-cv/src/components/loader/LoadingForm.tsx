'use client'
import { Formik, Form, useFormikContext } from 'formik';
import InputElement from '@/components/Input/Input';
import { InputType } from '@/types/index';
import AdminButton from '@/components/button/AdminButton';
import React from 'react';
import TypographyDemo from '@/components/loader/TypographyDemo';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const inputs: Record<string, TypographyProps["variant"]>[] = [
    {
        variant: "h3",
    },
    {
        variant: "body1",
    },
    {
        variant: "caption",
    },
    {
        variant: "caption",
    },
    {
        variant: "body1",
    },
];

export default function LoadingForm() {

    return (
       
                <form className="bg-adminGr33 flex flex-col padding-elements gap-4 rounded-lg">
                    <span className="text-lg font-extrabold text-adminTx flex"><Skeleton sx={{ width: '30%' }} animation="wave" /></span>
                    {inputs.map((input, index) => (
                        <>
                            <TypographyDemo key={`input-${index}-${input.variant}`} variant={input.variant} />
                        </>
                    ))}
                    <SubmitButton pending={true} >
                        Submit
                    </SubmitButton>
                </form>
    );
}
function SubmitButton({ pending, children }: { pending: boolean, children: React.ReactNode }) {


    return (
        <AdminButton type="submit"
            pending={pending}
        >
            {pending ? 'Loading...' : children}
        </AdminButton>
    );
}
