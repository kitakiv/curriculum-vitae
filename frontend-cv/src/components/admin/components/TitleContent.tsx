import MiddleText from "@/components/text/MiddleText";
import projects from "@/variables/projects/projects";
import Image from "next/image";

export default function TitleContent({title, image, tailwind}: {title: string, image: string, tailwind?: string}) {
    return (
        <div className={tailwind}>
        <Image src={image} alt="slider" style={{backgroundImage: `url(${projects.defaultImage})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center start'}} width={1000} height={500} className="h-20 w-fit rounded-md"></Image>
        <MiddleText tailwind='text-adminTx font-bold'>{title}</MiddleText>
        </div>
    )
}