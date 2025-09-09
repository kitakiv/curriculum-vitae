import Image from "next/image";
export default function AdminImage({tailwind, path, alt}: { tailwind?: string, path: string, alt?: string}) {
    return (
    <div className=" flex justify-center items-center col-span-2 transition duration-700  group  lg:w-80 lg:h-80 sm:w-80 sm:h-80 w-56 h-56">
            <Image src={path} alt={alt || "developer"} width={320} height={320} className={`${tailwind} transition-all duration-700 bg-bg0 rounded-full z-10 stroke-bg100 object-cover w-full h-full`} />
    </div>
    )
}