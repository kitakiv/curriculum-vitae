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
    <div className="bg-adminGr100 w-full h-full min-h-screen px-0 py-0 pt-20"> 
       <HeaderAdmin/>
              <main className="grid grid-cols-12 h-full">
                  <div className="col-span-2 h-full">{sidebar}</div>
                <div className="col-span-10 w-full flex-col gap-4 "> 
                  {breadcrumbs}
                  {children}
                </div>
              </main>
  </div>
  )
}