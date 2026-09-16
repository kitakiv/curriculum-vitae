import type { Metadata } from "next";
import form from "@/variables/form/form";

export const metadata: Metadata = {
  title: form.changePasswordForm.metadataTitle,
  description: form.changePasswordForm.metadataDesctiption,
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