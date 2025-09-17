'use client'
import {Formik, Form, useFormik} from 'formik';
import InputElement from '@/components/Input/Input';
import { InputType } from '@/types/index';
export default function FormElement({initialValues, onSubmit, validationSchema, inputs, children, submitElement, tailwind}: {initialValues: object, onSubmit: (values: object) => void, validationSchema: object, inputs: InputType[], children: React.ReactNode, submitElement: React.ReactNode, tailwind?: string}) {

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: values => {
      onSubmit(values);
    },
    validationSchema: validationSchema
  });
    return (
        <>
        <Formik initialValues={initialValues}
         onSubmit={(values) => onSubmit(values)}
         validationSchema={validationSchema}
         >
          {({ setFieldValue }) => (
            <Form className={`${tailwind}`}>
              {children}
              {inputs.map((input) => (
                <InputElement
                  key={input.id}
                  inputData={input}
                  setFieldValue={setFieldValue}
                />
              ))}
              {inputs[0].readonly ? null : submitElement}
            </Form>
          )}
        </Formik>
        </>
    );
}