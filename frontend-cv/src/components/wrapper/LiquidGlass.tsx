import SvgLiquidGlass from "@/components/wrapper/SvgLiquidGlass"
export default function LiquidGlass({children, shadow = false, rounded = false, hover = false, shine = false, tint = false, width = false, tailwind, tailwindParent,}: {children?: React.ReactNode, shadow?: boolean, rounded?: boolean, hover?: boolean, tint?: boolean, shine?: boolean, width?: boolean, tailwind?: string, tailwindParent?: string}) {
  return (
    <>
    <SvgLiquidGlass />
    <div className={`liquidGlass-wrapper ${tailwindParent} ${width ? "w-full": ""}  ${shadow ? "liquidGlass-shadow border-[1px] border-light":  "border-[1px] border-transparent"} ${rounded ? "rounded-full": ""} ${hover ? "liquidGlass-hover": ""}`}>
          <div className="liquidGlass-effect" ></div>
          <div className={`${tint ? "liquidGlass-tint": ""}`} ></div>
          <div className={`${shine ? "liquidGlass-shine": ""}`} ></div>
          <div className={`${tailwind} liquidGlass-text`}>{children}</div>
    </div>
    </>
  )
}