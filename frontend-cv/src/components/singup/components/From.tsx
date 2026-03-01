'use client'

import form from '@/variables/form/form';
import schema from '@/validation/schemaValidation';
import PinkButton from '@/components/button/PinkButton';
import Image from 'next/image';
import header from '@/variables/header/header';
import TextBlack from '@/components/text/TextBlack';
import SmallText from '@/components/text/SmallText';
import { Formik, Form, useFormikContext } from 'formik';
import InputElement from '@/components/Input/Input';
import { signup } from '@/app/actions/auth';
import { useActionState, startTransition } from 'react';
export default function FormSignAdmin() {
  const [state, action, pending] = useActionState(signup, undefined)
  return (
    <>
      <>
        <Formik initialValues={form.signupForm.initialValues}
          validationSchema={schema.signUp}
          onSubmit={async (values) => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
              formData.append(key, value);
            });
            startTransition(() => {
              action(formData);
            });
          }}
        >
          {({ setFieldValue }) => (
            <Form className='padding-elements gap-4 grid xl:w-[30vw] lg:w-[40vw] md:w-[40vw] sm:w-full w-full  liquidGlass-elem liquidGlass-shadow rounded-lg  bg-slate-950'>
              <div className="w-full flex justify-center items-center">
                <img className="rounded-xl bg-gradient-to-tr from-txFirst0 to-txFirst100 p-1 w-11 h-11" src={form.signupForm.svg} alt="logo"></img>
              </div>
              <TextBlack tailwind='text-center w-full font-bold'>{form.signupForm.title}</TextBlack>
              <SmallText tailwind='text-center w-full  text-footerTx'>{form.signupForm.text}</SmallText>
              {state?.message && (
                <SmallText tailwind={`text-center w-full ${state.success ? 'text-green-500' : 'text-red-500'}`}>
                  {state.message}
                </SmallText>
              )}
              {form.signupForm.inputs.map((input) => (
                <InputElement
                  key={input.id}
                  inputData={input}
                  setFieldValue={setFieldValue}
                />
              ))}
              <SubmitButton pending={pending} />
            </Form>
          )}
        </Formik>
      </>
    </>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  const { errors, isValid } = useFormikContext();
  const hasErrors = Object.keys(errors).length > 0;
  const isDisabled = !isValid || hasErrors || pending;

  return (
    <PinkButton
      type="submit"
      disabled={isDisabled}
      tailwind={`transition duration-700 flex justify-center items-center gap-2 ${!isDisabled ? 'group hover:shadow-lg hover:shadow-txSecond' : 'opacity-50 cursor-not-allowed'}`}
    >
      {pending ? 'Loading...' : form.signupForm.buttonText}
      {!pending && <Image src={header.arrow} alt="arrow" width={20} height={20} className={`transition duration-700 ${!isDisabled ? 'w-0 opacity-0 group-hover:w-5 group-hover:opacity-100' : 'w-0 opacity-0'}`}></Image>}
    </PinkButton>
  );
}