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
  sidebar
}: {
  children: React.ReactNode
  sidebar?: React.ReactNode
}) {
  return (
    <> 
       <HeaderAdmin/>
              <main className="bg-adminGr100 w-full min-h-screen grid grid-cols-12">
                  <div className="col-span-2 padding">{sidebar}</div>
                <div className="col-span-10 w-full px-5 py-10 mt-20"> 
                  {children}
                </div>
              </main>
  </>
  )
}