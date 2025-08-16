/* eslint-disable react/jsx-key */
'use client'
import theme from "@/variables/theme/theme";
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { changeTheme } from '@/features/theme/themeSlice'
export default function ThemeIcon() {
    const value = useAppSelector((state) => state.theme.value)
    const dispatch = useAppDispatch()
    const allTheme = Object.keys(theme)
    return (
       <>
       {allTheme.map((item, index) => {
           if (item === value) {
            return (
                <button>
                {item}
                </button>
            )
           }
           return (<button className="text-txFirst100" onClick={() => dispatch(changeTheme(item))}>
            {item}
           </button>)
        })}
       </>
    )
}