"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tick02Icon } from "hugeicons-react";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

function CheckoutSuccessContent() {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();

  const clearLocalCart = () => {
    // Invalidate cart query so it fetches the empty cart from the backend
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    if (token) {
      queryClient.setQueryData(["cart", token], []);
    }
  };

  useEffect(() => {
    clearLocalCart();
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardContent className="pt-10 pb-8 px-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Tick02Icon className="size-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-[#003d29] mb-2">
            Order Confirmed!
          </h2>
          <p className="text-gray-500 mb-8">
            Thank you for your purchase. We have received your order and it
            is currently being processed.
          </p>

          <div className="w-full space-y-3">
            <Link href="/shop" className="w-full block">
              <Button className="w-full bg-[#beef63] hover:bg-[#aedf4d] text-[#003d29] font-bold rounded-full py-6 text-base">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/account/orders" className="w-full block">
              <Button
                variant="outline"
                className="w-full border-[#003d29] text-[#003d29] hover:bg-gray-50 font-bold rounded-full py-6 text-base"
              >
                View My Orders
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 border-4 border-[#beef63] border-t-transparent rounded-full animate-spin mb-6"></div>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}