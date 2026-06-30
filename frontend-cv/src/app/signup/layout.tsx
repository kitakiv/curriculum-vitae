import type { Metadata } from "next";
import form from "@/variables/form/form";

export const metadata: Metadata = {
  title: form.signupForm.metadataTitle,
  description: form.signupForm.metadataDesctiption,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
        {children}
      </>
  )
}