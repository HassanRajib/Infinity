import Link from "next/link";
import React from "react";
import NavAd from "@/component/NavAd";


export default function DeshboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="h-screen flex">
            <div className=" w-[10%] md:w-[8%] lg:w-[10%] xl:w-[15%] p-4">
                <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
                
                <span className="hidden lg:block"> Infinity PathwayZ </span>
                </Link>
                
            </div>

            <div className=" w-[90%] md:w-[92%] lg:w-[90%] xl:w-[85%] bg-[#F7F8FA] overflow-scroll flex flex-col">
                <NavAd/>
                {children}
            </div>
        </div>
    )
}