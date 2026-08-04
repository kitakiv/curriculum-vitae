import Link from 'next/link';
import { GetUserMutation } from '@/gql/graphql';
import Image from 'next/image';
import LiquidGlassButton from '@/components/button/LiquidButton';
import header from '@/variables/header/header';
import LogoutForm from '@/components/admin/logout/LogoutForm';

interface AuthButtonsProps {
    user: GetUserMutation['getUser'] | undefined | false;
}

export default function HeaderAuth({ user }: AuthButtonsProps) {
    if (!user) {
        return (
            <div className="flex itmes-center justify-center gap-2">
                <Link 
                    href={header.buttonSignUp.link}
                    className='flex items-center justify-center h-full'
                >
                    <LiquidGlassButton>{header.buttonSignUp.text}</LiquidGlassButton>
                </Link>
                <Link 
                    href={header.buttonLogin.link}
                     className='flex items-center justify-center h-full'
                >
                    <LiquidGlassButton>{header.buttonLogin.text}</LiquidGlassButton>
                </Link>
            </div>
        );
    }
    return (
        
        <div className="h-full flex gap-2 justify-center items-center">
            <Link 
                href={header.buttonAdmin.link}
                 className='flex items-center justify-center h-full flex-shrink'
            >
                <LiquidGlassButton>{header.buttonAdmin.text}</LiquidGlassButton>
            </Link>
            <LogoutForm />
            <Link 
                href="/profile"
                className="liquidGlass-elem liquidGlass-shadow h-11 w-11 rounded-full border-[1px] border-light flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0 overflow-hidden"
            >
                <img 
                    src={(typeof user.avatarPhoto === 'string')? user.avatarPhoto : header.profileButton.svgLink}
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full"
                />
            </Link>
        </div>
    );
}
