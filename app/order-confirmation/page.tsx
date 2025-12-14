"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tick01Icon } from "hugeicons-react";
import { CheckoutProgress } from "@/components/checkout/checkout-progress";
import { cn } from "@/lib/utils";

export default function OrderConfirmationPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 p-4">
            <div className="pt-8 mb-8">
                <CheckoutProgress currentStep={3} />
            </div>
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-md shadow-xl border-none">
                    <CardContent className="flex flex-col items-center p-8 sm:p-12 text-center space-y-6">
                        {/* Success Icon */}
                        <div className="size-24 bg-linear-to-tr from-lime-500 to-green-600 rounded-3xl rotate-12 flex items-center justify-center shadow-lg shadow-green-200 mb-4 transform hover:rotate-6 transition-transform duration-500">
                            <Tick01Icon className="size-12 text-white" strokeWidth={3} />
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-[#003d29]">
                                Order Confirmed
                            </h1>
                            <p className="text-gray-500 max-w-xs mx-auto">
                                We have receive your order. You'll get a confirmation email to{" "}
                                <span className="font-semibold text-[#003d29]">
                                    hello@musemind.agency
                                </span>
                            </p>
                        </div>

                        <div className="w-full space-y-3 pt-4">
                            <Button
                                variant="outline"
                                className="w-full rounded-full py-6 border-[#003d29] text-[#003d29] hover:bg-[#003d29] hover:text-white transition-colors text-base font-semibold"
                            >
                                View order details
                            </Button>
                            <Link
                                href="/"
                                className={cn(
                                    buttonVariants(),
                                    "w-full bg-[#aedf4d] hover:bg-[#9ccc3c] text-[#003d29] font-bold rounded-full py-6 text-base shadow-sm hover:shadow-md transition-all sm:h-auto"
                                )}
                            >
                                Continue shopping
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
