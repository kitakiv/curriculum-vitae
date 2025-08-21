export default function HeaderSecondText({text}: {text: string}) {
    return (
        <span className="absolute text-wrap text-center text-txSecond lg:text-2xl w-2/4 md:text-2xl text-xl lg:bottom-28  sm:bottom-28 bottom-1/4 left-1/2 -translate-x-1/2">{text}</span>
    )
}