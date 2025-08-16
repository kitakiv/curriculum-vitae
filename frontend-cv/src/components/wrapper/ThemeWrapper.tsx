'use client'
import { useAppSelector } from '@/store/hooks';


export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const theme = useAppSelector((state) => state.theme.value);
    return (
        <body className={`theme-${theme}`}>
          {children}
        </body>
      );
}