
export default function Rounds({children}: {children: React.ReactNode}) {
    return (
       <>
       <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
    <div className=" absolute top-0 left-0 w-full h-full container-rounds" >
        <div className="absolute w-72 h-72  top-1/4 right-1/4 rounded-full gradient-box-rounds-third opacity-40   z-0 overflow-hidden"></div>
        <div className="absolute h-80 w-80 top-1/2 -translate-y-1/2 left-1/3 rounded-full gradient-box-rounds-second opacity-50 overflow-hidden"></div>
        <div className="absolute w-40 h-40 top-1/4 -translate-y-1/2 left-1/3 rounded-full gradient-box-rounds-second opacity-20  z-20 overflow-hidden"></div>
        <div className="absolute lg:w-80 lg:h-80 md:w-64 md:h-64 sm:w-64 sm:h-64 w-48 h-48 bottom-11 right-11 rounded-full gradient-box-rounds opacity-40  overflow-hidden sm:-z-0 -z-10"></div>
        <div className="absolute w-72 h-72 top-0 left-2/4 rounded-full rotate-45 gradient-box-rounds-second opacity-40  z-0 overflow-hidden"></div>
        <div className="absolute w-72 h-72 top-2/3 bottom-0 left-1/4 rounded-full gradient-box-rounds-third opacity-60  z-0 overflow-hidden"></div>
        {children}
    </div>
       </>
    );
}