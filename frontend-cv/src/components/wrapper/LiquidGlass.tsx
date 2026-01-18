export default function LiquidGlass({children, shadow = false, rounded = false, hover = false, tailwind}: {children: React.ReactNode, shadow?: boolean, rounded?: boolean, hover?: boolean, tailwind?: string}) {
  return (
    <div className={`${tailwind} liquid-glass ${shadow ? 'liquid-glass-shadow' : ''} ${rounded ? 'rounded-full' : ''} ${hover ? 'liquid-glass-hover' : ''}`}>
        {children}
    </div>
  )
}