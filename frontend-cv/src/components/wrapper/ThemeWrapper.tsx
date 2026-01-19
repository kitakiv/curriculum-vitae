'use client'
import { changeTheme } from '@/features/theme/themeSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';


export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const theme = useAppSelector((state) => state.theme.value);
    const dispatch = useAppDispatch()

    useEffect(() => {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      const defaultTheme = isDarkMode ? 'dark' : 'static';
      const localTheme = localStorage.getItem('theme') || defaultTheme;
      dispatch(changeTheme(localTheme));
    }, []);

    return (
        <body  className={`theme-${theme}`}>
          {children}
        </body>
      );
}
