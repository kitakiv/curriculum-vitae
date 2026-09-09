import type { Metadata } from "next";
import profile from "@/variables/profile/profile";

export const metadata: Metadata = {
  title: profile.metadataTitle,
  description: profile.metadataDescription,
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