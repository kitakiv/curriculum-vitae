
type Props = React.HtmlHTMLAttributes<HTMLButtonElement> & { 
    children: React.ReactNode,
     tailwind?: string, 
     disabled?: boolean
    }
export default function RoundedButton({children, tailwind, disabled = false, ...props}: Props) {
      return (
    <button disabled={disabled} {...props} className={`${tailwind} flex justify-center items-center padding-button rounded-full bg-txSecond/10 transition duration-700 ease-in-out shadow-none text-light hover:bg-txSecond/40 hover:shadow-lg hover:shadow-bg100`}>
            <span className="opacity-100">{children}</span>
        </button>
    )
}