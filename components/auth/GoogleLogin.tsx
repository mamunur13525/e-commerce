"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@/hooks/api/queries";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

const GoogleLogin = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { setAuth } = useAuthStore();
    const googleLoginMutation = useGoogleLogin();

    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
    const redirectUri = typeof window !== "undefined" ? `${window.location.origin}/api/auth/google/callback` : "";

    const handleGoogleLogin = () => {
        if (!GOOGLE_CLIENT_ID) {
            toast.error("Google OAuth is not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID");
            return;
        }

        setIsLoading(true);

        // Redirect to Google OAuth
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: redirectUri,
            response_type: "code",
            scope: "email profile",
            access_type: "offline",
            prompt: "consent",
        }).toString()}`;

        window.location.href = authUrl;
    };

    return (
        <Button
            variant="outline"
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading || googleLoginMutation.isPending}
            className="h-12 border-gray-200 hover:bg-gray-50 bg-gray-50/50 w-full text-base font-semibold shadow-md shadow-zinc-600/10 disabled:opacity-50"
        >
            <svg className="mr-1 h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {isLoading || googleLoginMutation.isPending ? "Signing in..." : "Google"}
        </Button>
    );
};

export default GoogleLogin;