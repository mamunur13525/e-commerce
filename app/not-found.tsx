import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white text-center px-4">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
                <Image
                    src="/404-character.png"
                    alt="404 Character"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#1f2937] mb-3">
                Uh-oh... I think I took a wrong turn.
            </h1>

            <p className="text-gray-500 mb-8 text-lg">
                Let's get you back to where the cute things live.
            </p>

            <Link href="/">
                <Button className="bg-gray-100 hover:bg-gray-200 text-[#1f2937] font-semibold px-8 py-6 rounded-xl text-base shadow-sm">
                    Go home
                </Button>
            </Link>
        </div>
    );
}
