import type { Metadata } from "next";
import ProviderStore from "@/components/provider/ProviderStore";
import ThemeWrapper from "@/components/wrapper/ThemeWrapper";
import PositionWrapper from "@/components/wrapper/PositionWrapper";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Login Page",
  description: "Login Page",
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