'use client';
import { logoutForm } from "@/variables/admin/resource";
import { Formik, Form } from 'formik';
import LiquidGlassButton from '@/components/button/LiquidButton';

export default function LogoutForm() {
  return (
    <Formik
      initialValues={{}}
      onSubmit={async (_, { setSubmitting }) => {
        try {
          setSubmitting(true);
          await logoutForm.action();
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex items-center justify-center h-full">
            <LiquidGlassButton type="submit">{isSubmitting ? logoutForm.pendiong : logoutForm.button}</LiquidGlassButton>
        </Form>
      )}
    </Formik>
  );
}