import Link from "next/link";
import RoudedButton from "@/components/button/RoundedButton";
import { adminVariables } from "@/variables/admin/resource";
import {redirect} from "next/navigation";
export default function ForgotPassword() {
    return (
        <Link onClick={() => {redirect(adminVariables.forgotPassword.path)}} href={adminVariables.forgotPassword.path}>
        <RoudedButton tailwind={"w-full"}>{adminVariables.forgotPassword.button}</RoudedButton>
        </Link>
    )
}