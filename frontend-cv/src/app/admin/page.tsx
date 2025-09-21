import AdminHeader from "@/components/header/HeaderAdmin";
import AdminPage from "@/components/admin/Admin";

export default function Admin() {
    return (
        <>
        <AdminHeader/>
        <main className="bg-adminGr100 w-full h-full min-h-screen">
         <AdminPage/>
        </main>
        </>
    );
}