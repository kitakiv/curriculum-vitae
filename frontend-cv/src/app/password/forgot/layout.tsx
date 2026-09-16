import type { Metadata } from "next";
import form from "@/variables/form/form";

export const metadata: Metadata = {
  title: form.forgotPasswordForm.metadataTitle,
  description: form.forgotPasswordForm.metadataDesctiption,
};

export default function ForgotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
        {children}
      </>
  )
}