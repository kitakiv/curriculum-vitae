import ButtonHeader from "@/components/button/ButtonHeader";
import LiquidGlass from "@/components/wrapper/LiquidGlass";

export default function BurgerIconAdmin({openBurger, tailwind, click}: {openBurger?: boolean, tailwind?: string, click?: () => void}) {
    return <>
    <div className={tailwind}  onClick={click}>
        <LiquidGlass rounded shine shadow >
            <div className="relative w-11 h-11 z-40 lg:hidden sm:block block" style={{ transform: openBurger ? "rotate(90deg) " : "rotate(0deg)" , transition: "all 0.3s ease-in-out"}} >
                <ButtonHeader tailwind="flex flex-col gap-[5px] rounded-full">
                    <div className="w-2/3 h-[2.5px] bg-txSecond rounded-full" ></div>
                    <div className="w-2/3 h-[2.5px] bg-txSecond rounded-full" ></div>
                    <div className="w-2/3 h-[2.5px] bg-txSecond rounded-full" ></div>
                </ButtonHeader>
            </div>
        </LiquidGlass>
    </div>
    </>

}