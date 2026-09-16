import type { Metadata } from "next";
import form from "@/variables/form/form";

export const metadata: Metadata = {
  title: form.resetPasswordForm.metadataTitle,
  description: form.resetPasswordForm.metadataDesctiption,
};

export default function ResetLayout({
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