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
    <div className="bg-adminGr100 w-full h-full min-h-screen px-0 py-0 pt-20 mx-o my-0"> 
       <HeaderAdmin/>
              <main className="grid grid-cols-12 h-full relative m-0 pt-4">
                  <div className=" lg:w-full md:w-full lg:col-span-2 lg:static md:static  md:col-span-3 h-full sm:absolute sm:top-0 sm:left-0 absolute top-0 left-0 sm:w-full sm:z-40 z-40 w-full">{sidebar}</div>
                <div className="lg:col-span-10 md:col-span-9 sm:col-span-12 col-span-12 w-full flex-col gap-4"> 
                  {breadcrumbs}
                  {children}
                </div>
              </main>
  </div>
  )
}