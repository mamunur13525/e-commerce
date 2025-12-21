"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserIcon, Settings02Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    {
        name: "Profile",
        href: "/account/profile",
        icon: UserIcon,
    }
];

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-24">
                        <h2 className="text-xl font-bold text-[#003d29] mb-4 px-3">Account</h2>
                        <nav className="space-y-1">
                            {sidebarItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium",
                                            isActive
                                                ? "bg-[#003d29]/5 text-[#003d29]"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-[#003d29]"
                                        )}
                                    >
                                        <item.icon className={cn("size-5", isActive ? "text-[#003d29]" : "text-gray-400")} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-h-[500px]">
                    {children}
                </main>
            </div>
        </div>
    );
}
