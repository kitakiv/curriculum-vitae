import SmallText from "@/components/text/SmallText";
import footer from "@/variables/footer/footer";
import header from "@/variables/header/header";

export default function EndFooter() {
    return (
        <div className=" lg:px-6 md:px-6 sm:px-4 px-2 gap-4">
            <div className="border-t-footerTx border-t-2 lg:pt-14 md:pt-12 sm:pt-11 pt-8 lg:pb-16 md:pb-14
             sm:pb-12 pb-8 w-full flex lg:flex-row sm:flex-col flex-col justify-between gap-2">
                <div className="flex flex-col gap-3">
                    <SmallText>{`${footer.year} ${header.name} ${header.surname}. ${footer.rights}`}</SmallText>
                    <SmallText tailwind="opacity-60">{footer.endTextSmall}</SmallText>
                </div>
                <SmallText tailwind="opacity-60">{footer.endTextRight}</SmallText>
            </div>
        </div>
    )
}