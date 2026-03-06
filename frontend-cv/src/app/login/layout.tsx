import type { Metadata } from "next";
import form from "@/variables/form/form";

export const metadata: Metadata = {
  title: form.loginForm.metadataTitle,
  description: form.loginForm.metadataDesctiption,
};

export default function LoginLayout({
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