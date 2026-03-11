"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tick02Icon, InformationCircleIcon } from "hugeicons-react";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import { toast } from "sonner";
import { getUserFromToken } from "@/lib/auth";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const { token, isAuthenticated } = useAuthStore();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    // If not authenticated, they shouldn't be here, but let the page render then redirect
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    // If there's a session ID, verify the Stripe payment
    if (sessionId) {
      verifyStripeSession(sessionId);
    } else {
      // If no session ID, it was a COD order which is already confirmed
      setStatus("success");
    }
  }, [sessionId, isAuthenticated, router]);

  const verifyStripeSession = async (id: string) => {
    try {
      const response = await fetch("/api/orders/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId: id }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        toast.error(data.message || "Payment verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setStatus("error");
      toast.error("An error occurred verifying your payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardContent className="pt-10 pb-8 px-6 flex flex-col items-center text-center">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 border-4 border-[#beef63] border-t-transparent rounded-full animate-spin mb-6"></div>
              <h2 className="text-2xl font-bold text-[#003d29] mb-2">
                Verifying Payment
              </h2>
              <p className="text-gray-500 mb-8">
                Please wait while we confirm your order...
              </p>
            </>
          )}

          {status === "success" && (
            <>
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
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <InformationCircleIcon className="size-10 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-red-600 mb-2">
                Payment Failed
              </h2>
              <p className="text-gray-500 mb-8">
                We couldn't verify your payment. Your order has not been placed.
                Please try again or contact support.
              </p>

              <Link href="/checkout" className="w-full block">
                <Button className="w-full bg-[#003d29] hover:bg-[#002a1c] text-white font-bold rounded-full py-6 text-base">
                  Return to Checkout
                </Button>
              </Link>
            </>
          )}
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
