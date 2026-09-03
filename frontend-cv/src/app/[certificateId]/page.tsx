import experiences from "@/variables/experience/experience";
import { Modal } from "../../components/wrapper/Modal";


interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ certificateId: string }>;
}

export default async function Page({
  params,
  searchParams,
}: PageProps) {
  const id = (await params).certificateId;
  const link = (await searchParams)[experiences.redirectQuery];
   if (!link && !id) {
    return <Modal><p className="text-center text-txSecond">No certificate found</p></Modal>
   }
   if (!link) {
    return <Modal><p className="text-center text-txSecond">No certificate link found</p></Modal>
   }
   if (typeof link === "string") {
     return <div className="flex justify-center items-center overflow-scroll">  
    <img src={decodeURI(link) || `${id}`} alt={id} className="rounded-3xl overflow-scroll w-full h-auto object-contain" />
    </div>
  }
   return null
 } 