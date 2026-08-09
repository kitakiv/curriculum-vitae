import BurgerIconAdmin from './BurgerIconAdmin';
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleBurgerMenuAdmin } from "@/features/position/PositionSlice";
import LiquidGlassButton from '@/components/button/LiquidButton';


export default function SidebarWrapper({ children }: {children: React.ReactNode}) {
    const burgerOpen = useAppSelector((state) => state.position.value.burgerMenuAdmin);
    const dispatch = useAppDispatch();
    function handleClick( ) {
        dispatch(toggleBurgerMenuAdmin());
    }
  return (
    <>  
    <BurgerIconAdmin openBurger={burgerOpen} click={() => handleClick()} />
    
    <aside className="sticky lg:top-24 md:top-24 rounded-lg sm:hidden hidden lg:block md:block">
      <nav className="flex flex-col gap-2 ">
        {children}
      </nav>
    </aside>
     <aside className="sticky lg:hidden md:hidden sm:block block top-32 bg-adminGr100 transition-all duration-300" style={{ transform: burgerOpen ? "translateX(0%)" : "translateX(-100%)", transition: "all 0.3s ease-in-out" }}>
      <nav className="flex flex-col gap-2">
        {children}
      </nav>
    </aside>
    </>
  );
}
