
import type { Metadata } from "next";
import '@/styles/globals.css';
import ProviderStore from "@/components/provider/ProviderStore";
import ThemeWrapper from "@/components/wrapper/ThemeWrapper";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: {
    default: "Curriculum Vitae",
    template: "%s | Curriculum Vitae",
  },
  description: "Profile application about me",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} scroll-smooth`}>
    <ProviderStore>
      <ThemeWrapper>
          {children}
      </ThemeWrapper>
    </ProviderStore>
    </html>
  )
}
