import { Modal } from "./modal";

export default async function Page({
    params,
  }: {
    params: Promise<{ certificateId: string }>;
  }) {
    const id = (await params).certificateId;
    console.log('cetificateId', id);
    return  <Modal certificateId={id} />
  }