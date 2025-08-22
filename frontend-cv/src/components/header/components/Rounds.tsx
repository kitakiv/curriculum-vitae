export default function Rounds() {
    return (
       <>
        <div className="absolute lg:h-64 lg:w-64 md:h-48 md:w-48 sm:h-48 sm:w-48 h-32 w-32 top-15 left-11 rounded-full bg-gradient-to-tl from-rn0 to-rn100 opacity-50 animation-gradient-animate overflow-hidden"></div>
        <div className="absolute sm:w-36 sm:h-36 lg:w-36 lg:h-36 h-28 w-28 top-1/2 -translate-y-1/2 left-1/3 rounded-full bg-gradient-to-tl from-rn0 to-rn100 opacity-20 animation-gradient-animate z-20 overflow-hidden"></div>
        <div className="absolute lg:w-80 lg:h-80 md:w-64 md:h-64 sm:w-64 sm:h-64 w-48 h-48 bottom-11 right-11 rounded-full bg-gradient-to-tl from-rn100 to-rn0 opacity-40 animation-gradient-animate overflow-hidden sm:-z-0 -z-10"></div>
       </>
    );
}