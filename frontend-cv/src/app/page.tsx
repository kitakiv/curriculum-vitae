import Header from "@/components/header/Header";

export default async function Page() {
  return (
    <>
     <Header />
     <main className="flex min-h-screen flex-col items-center justify-between bg-transparent">
      <h1 className="text-3xl text-txFirst100">Home</h1>
    </main>
    </>
  );
}
