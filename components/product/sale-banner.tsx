"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SaleBanner() {
    return (
        <div className="w-full bg-[#083c66] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden my-8">
            <div className="z-10 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
                    Sale Now On
                </h2>
                <p className="text-blue-100 font-medium">
                    Meat, Fruits, Chicken and more
                </p>
            </div>

            <div className="z-10">
                <Link href={'/shop'} className="cursor-pointer">
                    <Button className="bg-[#98dbe3] hover:bg-[#85cdd6] text-[#083c66] font-bold px-8 h-12 text-lg rounded-xl">
                        Shop Sale
                    </Button>
                </Link>
            </div>
        </div>
    );
}
