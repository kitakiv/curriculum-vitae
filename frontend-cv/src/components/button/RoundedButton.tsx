
type Props = React.HtmlHTMLAttributes<HTMLDivElement> & { 
    children: React.ReactNode,
     tailwind?: string, 
     disabled?: boolean
    }
export default function RoundedButton({children, tailwind, ...props}: Props) {
      return (
    <div {...props} className={`${tailwind} flex justify-center items-center padding-button rounded-full bg-txSecond/10 transition duration-700 ease-in-out shadow-none text-light hover:bg-txSecond/40 hover:shadow-lg hover:shadow-bg100`}>
            <span className="opacity-100">{children}</span>
        </div>
    )
}