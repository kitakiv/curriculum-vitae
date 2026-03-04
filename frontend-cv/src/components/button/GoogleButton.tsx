'use client'

import Image from 'next/image';

interface GoogleButtonProps {
  googleLink: string;
}

export default function GoogleButton({ googleLink }: GoogleButtonProps) {
  const handleGoogleLogin = () => {
    window.location.href = googleLink;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-all duration-300"
    >
      <Image src="/svg/google.svg" alt="Google" width={20} height={20} />
      <span className="text-gray-700 font-medium">Continue with Google</span>
    </button>
  );
}
