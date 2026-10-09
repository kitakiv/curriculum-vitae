import profile from "@/variables/profile/profile";
import UpdateFormUser from "@/components/admin/user/UpdateFormUser";
import UpdateFormUserImage from "@/components/admin/user/UpdateFormUserImage";

import UpdatePasswordForm from "../admin/user/UpdatePasswordForm";
import { GetUserMutation } from "@/gql/graphql";
import { redirect } from "next/dist/client/components/redirect";


interface Props {
   user: GetUserMutation['getUser'] | false
}

export default function ProfileComponent({ user }: Props) {
    if (!user) {
        redirect("/login");
    }

    return (
            <section className="grid lg:grid-cols-2 grid-cols-1 gap-4" id={profile.id}>
                <div className="w-full">
                <UpdateFormUser initialValues={user as GetUserMutation['getUser']} resourceId={user.id} />
                {/* <UpdatePasswordForm /> */}
                </div>
                <UpdateFormUserImage initialValues={user as GetUserMutation['getUser']} resourceId={user.id} />
            </section>
    )
}