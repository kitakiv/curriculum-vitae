import MainText from "@/components/text/MainText";
import header from "@/variables/header/header";
import footer from "@/variables/footer/footer";
import TextGray from "../text/TextGray";
import TextBlack from "../text/TextBlack";

export default function Footer() {
    return (
        <footer className="w-full flex flex-col lg:pt-14 md:pt-12 sm:pt-11 pt-8 lg:px-6 md:px-6 sm:px-4 px-2 gap-4">
           <p className="flex">
           <MainText tailwind="">{header.name + " " + header.surname}</MainText>
           </p>
           <TextGray tailwind="lg:w-1/3 md:w-2/3 sm:w-2/3 w-full">{footer.text}</TextGray>
            <TextBlack tailwind="font-bold opacity-70">{footer.contactsText}</TextBlack>
        </footer>
    );
}