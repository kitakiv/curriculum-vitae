import MiddleText from "@/components/text/MiddleText";
import Image from "next/image";

export default function TitleContent({title, image, tailwind}: {title: string, image: string, tailwind?: string}) {
    return (
        <div className={tailwind}>
        <Image src={image} alt="slider" width={1000} height={500} className="h-20 w-fit rounded-md"></Image>
        <MiddleText tailwind='text-adminTx font-bold'>{title}</MiddleText>
        </div>
    )
}