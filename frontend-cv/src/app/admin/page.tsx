import HeaderLogin from "@/components/header/HeaderLogin";
import AdminPage from "@/components/admin/Admin";

export default function Admin() {
    return (
        <>
        <HeaderLogin/>
        <main className="bg-adminGr100 w-full h-full min-h-screen">
         <AdminPage/>
        </main>
        </>
    );
}