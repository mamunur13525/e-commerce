import Image from "next/image";
import { Button } from "@/components/ui/button";

export function DownloadAppBanner() {
    return (
        <section className="container mx-auto px-4 py-8 md:py-16">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#5a103c] px-6 py-12 md:px-16 md:py-20 lg:flex lg:items-center lg:justify-between">
                {/* Decorative elements */}
                <div className="absolute left-10 top-10 h-32 w-32 rounded-full border border-white/10 opacity-50" />
                <div className="absolute -left-10 top-20 h-40 w-40 rounded-full border border-white/5 opacity-30" />
                <div className="absolute bottom-10 right-1/3 h-20 w-20 opacity-20">
                    {/* Abstract wavy lines */}
                    <svg viewBox="0 0 100 100" fill="none" stroke="white">
                        <path d="M0 20 Q25 0 50 20 T100 20" />
                        <path d="M0 40 Q25 20 50 40 T100 40" />
                        <path d="M0 60 Q25 40 50 60 T100 60" />
                    </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-xl text-center lg:text-left">
                    <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl lg:text-5xl">
                        Stay Home and Get All Your Essentials From Our Market!
                    </h2>
                    <p className="mb-8 text-lg text-white/80">
                        Download the app from app store or google play
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                        {/* Google Play Button */}
                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg bg-black px-5 py-2.5 text-white transition-transform hover:scale-105"
                        >
                            <div className="relative h-8 w-8">
                                {/* Simple Google Play Icon SVG */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.84L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.16L16.81,8.88L14.54,11.15L3.84,2.15L6.05,2.16Z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <div className="text-[10px] uppercase leading-none">Get it on</div>
                                <div className="text-sm font-bold leading-tight">Google Play</div>
                            </div>
                        </a>

                        {/* App Store Button */}
                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg bg-black px-5 py-2.5 text-white transition-transform hover:scale-105"
                        >
                            <div className="relative h-8 w-8">
                                {/* Simple Apple Icon SVG */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.69C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <div className="text-[10px] uppercase leading-none">Download on the</div>
                                <div className="text-sm font-bold leading-tight">App Store</div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Image - Delivery Man */}
                <div className="relative mt-12 flex justify-center lg:mt-0 lg:absolute lg:right-0 lg:bottom-0">
                    {/* Using a placeholder div or check if I can generate an image later.
                 For now, a colored silhouette or placeholder.
             */}
                    <div className="h-[400px] w-[350px] bg-orange-500/0 relative">
                        {/* Masked Image Placeholder */}
                        <div className="absolute inset-x-0 bottom-0 h-full w-full flex items-end justify-center">
                            {/* Placeholder for legal reasons + speed, mimicking the delivery man */}
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 bg-orange-200 rounded-full mb-2"></div>
                                <div className="w-64 h-80 bg-orange-500 rounded-t-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
