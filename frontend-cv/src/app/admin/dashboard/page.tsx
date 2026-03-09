import AdminHeader from "@/components/header/HeaderAdmin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { GetUserMutation } from "@/gql/graphql";
import { getMe } from "@/query/auth.query";
import ResourceSection from "@/components/admin/components/ResourceSection";

export default async function Admin() {
     const user: GetUserMutation['getUser'] | false = await getMe()
    return (
        <>
        <AdminHeader/>
        <main className="bg-adminGr100 w-full h-full min-h-screen">
         <AdminDashboard user={user}>
           <ResourceSection user={user}/>
         </AdminDashboard>
        </main>
        </>
    );
}