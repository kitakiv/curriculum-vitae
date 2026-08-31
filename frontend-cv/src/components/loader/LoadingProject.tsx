
import TextWhite from "@/components/text/TextWhite";
import TextGray from "@/components/text/TextGray";
import PinkButton from "@/components/button/PinkButton";
import GrayButton from "@/components/button/GrayButton";
import TechBlock from "@/components/button/TechBlock";
import SmallText from "@/components/text/SmallText";
import { Skeleton } from "@mui/material";


export default function LoadingProject() {
  return (
    <div className="w-auto h-full bg-projectBg rounded-b-xl shadow-xl flex flex-col justify-between">
        <Skeleton variant="rounded" className="lg:min-h-96 min-h-96 lg:w-full sm:w-full w-full " />
        <div className="flex flex-col lg:gap-6 md:gap-5 sm:gap-4 gap-4 lg:p-7 md:p-6 sm:p-4 p-2 items-start justify-end h-auto">
          <TextWhite tailwind="w-full"><Skeleton variant="text" sx={{ width: '30%' }} /></TextWhite>
          <TextGray tailwind="w-full"><Skeleton variant="text" sx={{ width: '50%' }} /></TextGray>
              <div className="flex flex-col w-full gap-1">
              <SmallText tailwind="font-bold text-txSecond w-full" ><Skeleton variant="text" sx={{width: "90%"}} /></SmallText>
              <div className="w-full h-[2px] bg-gradient-to-r from-light to-zOpacity rounded-full"></div>
              </div>
          
            <div className="flex gap-2">
                {
            // @ts-ignore
           Array.from({ length: 3 }).map((_, index) => (
              <TechBlock active={true} tailwind="gap-2"  key={`techStack-${index}-button`}>
                <Skeleton variant="circular" className="w-5 h-5" />
                <SmallText tailwind="text-light"><Skeleton variant="text" width={50} /></SmallText>
              </TechBlock>
            ))
                }
            </div>
      
          <div className="flex gap-2">
                <PinkButton tailwind="hover:shadow-lg hover:shadow-txSecond transition duration-700 lg:px-8 md:px-8 sm:px-4 px-2 lg:py-3 md:py-3  sm:py-1 py-1 lg:text-lg  sm:text-sm text-xs">
                    <Skeleton variant="text" sx={{ width: '100px' }} />
                </PinkButton>
                <GrayButton tailwind="flex gap-2 hover:shadow-lg hover:shadow-txSecond transition duration-700  lg:px-8 md:px-8 sm:px-4 px-2 lg:py-3 md:py-3 sm:py-1 py-1 lg:text-lg  sm:text-sm text-xs">
                  <Skeleton variant="text" sx={{ width: '70px' }} />
                  <Skeleton variant="circular" className="w-5 h-5" />
                </GrayButton>
          </div>
        </div>
    </div>
  )
}