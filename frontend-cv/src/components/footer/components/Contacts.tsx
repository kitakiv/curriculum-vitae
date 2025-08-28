import { ContactsCard } from "@/types/index";
import Image from "next/image";
import TextGray from "@/components/text/TextGray";
import ButtonHeader from "@/components/button/ButtonHeader";
import SmallText from "@/components/text/SmallText";
import FadeInSection from "@/components/animation/FadeInSection";



export default function Contacts({ contacts }: { contacts: ContactsCard[] }) {
    return (
        <address className="flex flex-col gap-2">
            {contacts.map((contact, index) => (
                <FadeInSection  key={`contact-${index}`}>
                    <div className="flex flex-row gap-5 items-center">
                        <a href={contact.href} target="_blank" rel="noopener noreferrer">
                            <ButtonHeader>
                                <Image src={contact.svg} alt={contact.name} width={20} height={20} className="w-5 h-5"></Image>
                            </ButtonHeader>
                        </a>
                        <div className="flex flex-col">
                            <span className="lg:text-md md:text-sm text-sm text-wrap text-txSecond font-bold">{contact.name.toUpperCase()}</span>
                            <a href={contact.href} target="_blank" rel="noopener noreferrer">
                                <SmallText tailwind="opacity-70" >{contact.contact}</SmallText>
                            </a>
                        </div>
                    </div>
                </FadeInSection>
            ))}
        </address>
    );
}