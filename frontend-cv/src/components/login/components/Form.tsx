'use client'
import {Formik, Form} from 'formik';
import form from '@/variables/form/form';
import InputElement from '@/components/Input/Input';
import schema from '@/validation/schemaValidation';
import PinkButton from '@/components/button/PinkButton';
import Image from 'next/image';
import header from '@/variables/header/header';
import TextBlack from '@/components/text/TextBlack';
import SmallText from '@/components/text/SmallText';
export default function FormAdmin() {
    return (
        <Formik initialValues={form.loginForm.initialValues}
         onSubmit={() => {alert('submit')}}
         validationSchema={schema.custom}
         >
            <Form className="lg:w-1/4 md:w-2/3 sm:w-2/3 w-2/3 flex flex-col gap-3 bg-form rounded-lg padding-elements relative z-40 first:-left-full ">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-txFirst0 to-txFirst100 flex justify-center items-center">
                <Image src={form.loginForm.svg} alt="logo" width={35} height={35}></Image>
              </div>
              <TextBlack tailwind='text-center w-full font-bold'>{form.loginForm.title}</TextBlack>
              <SmallText tailwind='text-center w-full  text-footerTx'>{form.loginForm.text}</SmallText>
              {form.loginForm.inputs.map((input) => (
                <InputElement
                  key={input.id}
                  id={input.id}
                  label={input.label}
                  name={input.name}
                  placeholder={input.placeholder}
                  type={input.type}
                />
              ))}
              <PinkButton type="submit" tailwind="transition duration-700 group flex justify-center items-center gap-2 hover:shadow-lg hover:shadow-txSecond">
                        {form.loginForm.buttonText}
                        <Image src={header.arrow} alt="arrow" width={20} height={20} className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition duration-700"></Image>
              </PinkButton>
            </Form>
        </Formik>
    );
}