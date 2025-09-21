import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin Page",
    template: "%s | Admin Page",
  },
  description: "Admin Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>{children}</>
  )
}