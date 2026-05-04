"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";

export function GoogleOAuthProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, we still want to render the provider if we have the ID
  // to avoid hydration mismatch if possible, but many OAuth libraries 
  // only work on the client anyway.
  
  if (!clientId) {
    if (mounted) {
      console.warn("Google OAuth Client ID is missing. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.");
    }
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
