import ThemeIcon from "@/components/header/components/ThemeIcon";

export default function Header() {
    return (
        <header className="flex items-center justify-between">
            <h1 className="text-3xl">Curriculum Vitae</h1>
            <ThemeIcon />
        </header>
    );
}