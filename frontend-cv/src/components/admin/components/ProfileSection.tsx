import MainText from "@/components/text/MainText";
import AdminImage from "./AdminImage";
import Profile from "./Profile";
import header from "@/variables/header/header";
import form from "@/variables/form/form";
import FormCreate from "./FormCreate";
import { getProfileCached } from "@/query/profile.query";

export default async function ProfileSection() {
    // const profile = await getProfileCached();
    return (
        <section id={form.profileForm.id} className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <MainText tailwind="text-adminTx font-bold flex lg:col-span-2">{form.profileForm.title}</MainText>
            <AdminImage path={header.path} />
            <Profile />
        </section>
    )
}