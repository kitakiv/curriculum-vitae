export default function GrayButton({children, click, tailwind}: {children: React.ReactNode, click?: () => void, tailwind?: string}) {
    return (
        <button onClick={click}  className={` ${tailwind} flex justify-center items-center w-auto h-auto px-8 py-3 rounded-full bg-gradient-to-r from-black to-txSecond transition duration-700 bg-opacity-80 ease-in-out text-light shadow-bg100 shadow-lg hover:bg-opacity-100`}>{children}</button>
    )

}