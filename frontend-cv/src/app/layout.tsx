
import type { Metadata } from "next";
import '@/styles/globals.css';
import ProviderStore from "@/components/provider/ProviderStore";
import ThemeWrapper from "@/components/wrapper/ThemeWrapper";
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
    <html lang="en">
    <ProviderStore>
      <ThemeWrapper>
          {children}
      </ThemeWrapper>
    </ProviderStore>
    </html>
  )
}
