
import FollowButton from "@/components/button/FollowButton";
import FadeInSection from "@/components/animation/FadeInSection";
import projects from "@/variables/projects/projects";
import { GetContactsQuery } from "@/gql/graphql";

export default function FollowMe({followContacts}: {followContacts: GetContactsQuery["contacts"]}) {
    return (
            <div className="grid grid-cols-2 lg:gap-6 sm:gap-4 gap-2">
                {followContacts.map((contact) => (
                    <FadeInSection key={contact.id} >
                    <a  href={contact.contactLink} target="_blank" rel="noopener noreferrer">
                        <FollowButton tailwind="flex gap-2">
                            <img src={contact.contactSvg === "" || !contact.contactSvg ? projects.defaultImage : contact.contactSvg} alt={contact.contactName} width={20} height={20} className="w-5 h-5"/>
                            <span className="lg:text-lg md:text-md text-sm text-wrap text-footerTx font-semibold" >{contact.contactName.charAt(0).toUpperCase() + contact.contactName.slice(1)}</span>
                        </FollowButton>
                    </a>
                    </FadeInSection>
                ))}
            </div>
    )
}