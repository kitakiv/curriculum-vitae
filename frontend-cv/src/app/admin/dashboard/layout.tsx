import type { Metadata } from "next";
import HeaderAdmin from "@/components/header/HeaderAdmin";

export const metadata: Metadata = {
  title: {
    default: "Admin Page",
    template: "%s | Admin Page",
  },
  description: "Admin Page",
};

export default function RootLayout({
  children,
  sidebar,
  breadcrumbs,
}: {
  children: React.ReactNode
  sidebar?: React.ReactNode
  breadcrumbs?: React.ReactNode
}) {
  return (
    < > 
          <HeaderAdmin/>
              <main className="grid grid-cols-12 bg-adminGr100 pt-20 h-full min-h-screen relative">
                  <div className="col-span-2">{sidebar}</div>
                <div className="lg:col-span-10 md:col-span-10 sm:col-span-12 col-span-12"> 
                  {breadcrumbs}
                  {children}
                </div>
              </main>
  </>
  )
}