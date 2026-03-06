import { Modal } from "../../../components/wrapper/Modal";

export default async function Page({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const id = (await params).certificateId;
   return <Modal><img src={`/image/${id}`} alt={id} className="rounded-3xl xl:w-1/3 lg:w-1/3 md:w-2/3 w-full h-auto object-contain" /></Modal>
 } 
