import MainText from "@/components/text/MainText";
import header from "@/variables/header/header";
import footer from "@/variables/footer/footer";
import TextGray from "@/components/text/TextGray";
import TextBlack from "@/components/text/TextBlack";
import Contacts from "@/components/footer/components/Contacts";
import FollowMe from "@/components/footer/components/FollowMe";
import EndFooter from "@/components/footer/components/EndFotter";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-bg33 to-bg0">
            <div className="w-full flex flex-col lg:pt-14 md:py-12 sm:py-11 py-8 lg:px-6 md:px-6 sm:px-4 px-2 gap-4">
           <div  className="flex">
           <MainText tailwind="">{header.name + " " + header.surname}</MainText>
           </div>
           <TextGray tailwind="lg:w-1/3 md:w-2/3 sm:w-2/3 w-full">{footer.text}</TextGray>
            <span className="text-shadow-lg text-shadow-light lg:text-xl md:text-lg text-md text-wrap text-footerTx font-bold opacity-70">{footer.contactsText}</span>
            <Contacts contacts={footer.contacts} />
            <span className="text-shadow-lg text-shadow-light lg:text-xl md:text-lg text-md text-wrap text-footerTx font-bold opacity-70">{footer.linksText}</span>
            <FollowMe links={footer.links} />
            </div>
            <EndFooter />
        </footer>
    );
}