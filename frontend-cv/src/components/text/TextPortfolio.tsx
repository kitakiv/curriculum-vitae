import MiddleText from "./MiddleText"

export default function TextPortfolio({children, tailwind}: {children: React.ReactNode, tailwind?: string}) {
    return (
        <MiddleText tailwind={`${tailwind} text-txFirst0 text-uppercase font-elegant`}>{children}</MiddleText>
    )
}