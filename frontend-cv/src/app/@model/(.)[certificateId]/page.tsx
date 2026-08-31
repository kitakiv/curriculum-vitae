import experiences from "@/variables/experience/experience";
import { Modal } from "../../../components/wrapper/Modal";


interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ certificateId: string }>;
}

export default async function Page({
  params,
  searchParams,
}: PageProps) {
  const id = (await params).certificateId;
  const rawLink = (await searchParams)[experiences.redirectQuery];
  const link = Array.isArray(rawLink) ? rawLink[0] ?? "" : rawLink ?? "";

  if (!link && !id) {
    return <Modal><p className="text-center text-txSecond">No certificate found</p></Modal>
  }
  if (!link) {
    return <Modal><p className="text-center text-txSecond">No certificate link found</p></Modal>
  }
  if (typeof link === "string") {
     return <Modal><img src={decodeURI(link) || `${id}`} alt={id} className="rounded-3xl xl:w-1/3 lg:w-1/3 md:w-2/3 w-full h-auto object-contain" /></Modal>
  }
  return null
 } 
