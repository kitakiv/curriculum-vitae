'use client'
import {Formik, Form} from 'formik';
import InputElement from '@/components/Input/Input';
import { InputType } from '@/types/index';
export default function FormElement({initialValues, onSubmit, validationSchema, inputs, children, submitElement, tailwind}: {initialValues: object, onSubmit: () => void, validationSchema: object, inputs: InputType[], children: React.ReactNode, submitElement: React.ReactNode, tailwind?: string}) {
    return (
        <>
        <Formik initialValues={initialValues}
         onSubmit={onSubmit}
         validationSchema={validationSchema}
         >
            <Form className={`${tailwind}`}>
              {children}
              {inputs.map((input) => (
                <InputElement
                  key={input.id}
                  inputData={input}
                />
              ))}
              {inputs[0].readonly ? null : submitElement}
            </Form>
        </Formik>
        </>
    );
}