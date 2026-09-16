import Link from "next/link";
import RoudedButton from "@/components/button/RoundedButton";
import { adminVariables } from "@/variables/admin/resource";
export default function ForgotPassword() {
    return (
        <Link href={adminVariables.forgotPassword.path}>
        <RoudedButton tailwind={"w-full"}>{adminVariables.forgotPassword.button}</RoudedButton>
        </Link>
    )
}