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
    <BurgerIconAdmin tailwind="w-11 h-11 z-50 fixed top-20 lg:hidden md:hidden sm:block block"  openBurger={burgerOpen} click={() => handleClick()} />
    
    <aside className="sticky py-4 w-full sm:hidden hidden lg:block md:block">
      <nav className="flex flex-col gap-2">
        {children}
      </nav>
    </aside>
     <aside className="fixed h-full lg:hidden md:hidden sm:block block top-20 bg-adminGr100 transition-all duration-300 sm:w-full w-full overflow-y-scroll" style={{ transform: burgerOpen ? "translateX(0%)" : "translateX(-100%)", transition: "all 0.3s ease-in-out", zIndex: burgerOpen ? 1 : -1 }}>
      <nav className="flex flex-col gap-2" onClick={handleClick}>
        {children}
      </nav>
    </aside>

    </>
  );
}
