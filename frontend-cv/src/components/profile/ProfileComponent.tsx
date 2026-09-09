import profile from "@/variables/profile/profile";
import UpdateFormUser from "@/components/admin/user/UpdateFormUser";
import UpdateFormUserImage from "@/components/admin/user/UpdateFormUserImage";
import { User } from "@/gql/graphql";


interface Props {
   user: User
}

export default function ProfileComponent({ user }: Props) {
    return (
            <section className="grid lg:grid-cols-2 grid-cols-1 gap-4" id={profile.id}>
                <UpdateFormUser initialValues={user} resourceId={user.id} />
                <UpdateFormUserImage initialValues={user} resourceId={user.id} />
            </section>
    )
}