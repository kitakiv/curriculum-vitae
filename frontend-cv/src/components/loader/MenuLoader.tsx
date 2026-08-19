'use client'
import React from 'react';
import TypographyDemo from '@/components/loader/TypographyDemo';

const NUMBER_OF_ITEMS = 7

export default function MenuLoader () {
    return (
        <aside className="sticky py-4 w-full sm:hidden hidden lg:block md:block overflow-y-scroll">
      <nav className="flex flex-col w-full items-center">
        {Array(NUMBER_OF_ITEMS).fill(0).map((_, index) => (
            <div key={index} className="w-9/12">
            <TypographyDemo key={index} variant={"h3"} tailwind="bg-adminGr33" />
            </div>
        ))}
      </nav>
    </aside>
    )
}