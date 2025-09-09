"use client"
import AdminBorder from "@/components/border/AdminBorder";
import { useState } from "react";
import Image from "next/image";
import form from "@/variables/form/form";

export default function MoreInfoBlock({children, tailwind, titleChildren}: {children: React.ReactNode, tailwind?: string, titleChildren?: React.ReactNode}) {
    const [show, setShow] = useState(false);
    return (
        <AdminBorder tailwind={`${tailwind} relative flex`}>
            <div className="flex justify-between items-center">
            {titleChildren || <></>}
            <Image src={form.moreInfoContent.buttonMore} style={{cursor: "pointer", rotate: show ? "90deg" : "0deg", transition: "all 0.3s ease-in-out"}} alt="slider" width={1000} height={500} className="h-5 w-fit" onClick={() => setShow(!show)}></Image>
            </div>
            {show && children}
        </AdminBorder>
    )
}