
import HeaderSection from "@/components/header/components/HeaderSection";
import ThemeIcon from "@/components/header/components/ThemeIcon";
import header from "@/variables/header/header";
import MainLink from "./components/MainLink";
import { getProfileCached } from "@/query/profile.query";
import { GetProfileQuery } from "@/gql/graphql";
import LogoutForm from "@/components/admin/logout/LogoutForm";


export default async function HeaderAdmin() {
    
    const profile: GetProfileQuery["profile"] = await getProfileCached();
    return (
        <HeaderSection>
               <MainLink href="/" profile={profile}/>
                 <LogoutForm />
        </HeaderSection>
    );
} 