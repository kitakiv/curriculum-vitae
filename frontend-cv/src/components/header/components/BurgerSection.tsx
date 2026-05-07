import ButtonHeader from "@/components/button/ButtonHeader";
import LiquidGlass from "@/components/wrapper/LiquidGlass";
interface Props {
    showItem: boolean;
    children: React.ReactNode
    onClick?: () => void
}
export default function BurgerSection({showItem, children, onClick}: Props) {
    return <>
    <div className="relative w-11 h-11 z-50 lg:hidden sm:block block">
            <div className="relative w-11 h-11 z-40 lg:hidden sm:block block" >
                <ButtonHeader click={onClick} tailwind="flex flex-col gap-[5px] rounded-full">
                    <div className="w-2/3 h-[2.5px] bg-black rounded-full" style={{ transform: showItem ? "rotate(65deg) translateY(9px) translateX(5px)" : "rotate(0deg) translateY(0%)", transition: "all 0.3s ease-in-out" }}></div>
                    <div className="w-2/3 h-[2.5px] bg-black rounded-full" style={{ opacity: showItem ? 0 : 1, transition: "all 0.3s ease-in-out" }}></div>
                    <div className="w-2/3 h-[2.5px] bg-black rounded-full" style={{ transform: showItem ? "rotate(-65deg) translateY(3px) translateX(8px)" : "rotate(0deg) translateY(0%)", transition: "all 0.3s ease-in-out" }}></div>
                </ButtonHeader>
            </div>
          
      
                <nav className="fixed itmes-center flex flex-col gap-4 top-0 right-0 w-screen h-screen overflow-y-scroll pb-20 liquid-glass-burger pt-20 px-4 transition duration-700" style={{ transform: showItem ? "translateX(0)" : "translateX(100%)" }}>
                    {children}
                </nav>
            </div>
    </>

}