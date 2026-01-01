"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

// Create a client for the app root once
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Disable automatic refetching on window focus in development
      refetchOnWindowFocus: process.env.NODE_ENV === "production",
      refetchOnMount: true,
      retry: 1,
      retryDelay: (attemptIndex:number) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

interface QueryClientProviderWrapperProps {
  children: ReactNode;
}

export function QueryClientProviderWrapper({
  children,
}: QueryClientProviderWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
