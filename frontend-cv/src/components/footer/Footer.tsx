import MainText from "@/components/text/MainText";
import header from "@/variables/header/header";
import footer from "@/variables/footer/footer";
import TextGray from "@/components/text/TextGray";;
import Contacts from "@/components/footer/components/Contacts";
import FollowMe from "@/components/footer/components/FollowMe";
import EndFooter from "@/components/footer/components/EndFotter";
import FadeInSection from "@/components/animation/FadeInSection";
import { getProfileCached } from "@/query/profile.query";
import { GetContactsQuery, GetProfileQuery } from "@/gql/graphql";
import { getContactsCached } from "@/query/contact.query";
export default async function Footer() {
    const profile: GetProfileQuery["profile"] = await getProfileCached();
    const contacts: GetContactsQuery["contacts"] = await getContactsCached();
    return (
        <footer className="bg-gradient-to-b from-bg33 to-bg0" id={footer.id}>
            <div className="w-full flex flex-col lg:pt-14 md:py-12 sm:py-11 py-8 lg:px-6 md:px-6 sm:px-4 px-2 gap-4">
                <FadeInSection>
                    <div className="flex">
                        <MainText tailwind="">{profile.name + " " + profile.surname}</MainText>
                    </div>
                </FadeInSection>
                <TextGray tailwind="lg:w-1/3 md:w-2/3 sm:w-2/3 w-full">{footer.text}</TextGray>
                <span className="text-shadow-lg text-shadow-light lg:text-xl md:text-lg text-md text-wrap text-footerTx font-bold opacity-70">{footer.contactsText}</span>
                <Contacts profile={profile} contacts={footer.contacts} />
                <span className="text-shadow-lg text-shadow-light lg:text-xl md:text-lg text-md text-wrap text-footerTx font-bold opacity-70">{footer.linksText}</span>
                <FollowMe followContacts={contacts} />
            </div>
            <EndFooter profile={profile} />
        </footer>
    );
}