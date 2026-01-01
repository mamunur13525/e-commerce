import { Suspense } from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-center bg-gray-50 py-32 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <Suspense fallback={<div>Loading...</div>}>
                    {children}
                </Suspense>
            </div>
        </div>
    );
}
