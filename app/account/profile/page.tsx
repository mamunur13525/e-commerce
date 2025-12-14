"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { UserIcon, Mail01Icon, SmartPhone01Icon, SecurityCheckIcon } from "hugeicons-react";

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Profile updated successfully!");
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#003d29]">My Profile</h1>
                <p className="text-gray-500">Manage your personal information and security settings.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Personal Information */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6">
                    <h2 className="text-lg font-bold text-[#003d29]">Personal Information</h2>
                    <Separator />
                    <div className="grid gap-6 md:grid-cols-2">
                        <FloatingInput
                            id="full-name"
                            label="Full Name"
                            defaultValue="John Doe"
                            startIcon={<UserIcon className="size-5" />}
                        />
                        <FloatingInput
                            id="email"
                            label="Email Address"
                            defaultValue="john.doe@example.com"
                            disabled
                            className="bg-gray-50 text-gray-500"
                            startIcon={<Mail01Icon className="size-5" />}
                        />
                        <FloatingInput
                            id="phone"
                            label="Phone Number"
                            defaultValue="+1 (555) 000-0000"
                            startIcon={<SmartPhone01Icon className="size-5" />}
                        />
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6">
                    <h2 className="text-lg font-bold text-[#003d29]">Security</h2>
                    <Separator />
                    <div className="grid gap-6 max-w-md">
                        <FloatingInput
                            id="current-password"
                            type="password"
                            label="Current Password"
                            startIcon={<SecurityCheckIcon className="size-5" />}
                        />
                        <FloatingInput
                            id="new-password"
                            type="password"
                            label="New Password"
                            startIcon={<SecurityCheckIcon className="size-5" />}
                        />
                        <FloatingInput
                            id="confirm-password"
                            type="password"
                            label="Confirm New Password"
                            startIcon={<SecurityCheckIcon className="size-5" />}
                        />
                    </div>
                </div>

                <div className="">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#003d29] hover:bg-[#002a1c] text-white min-w-[120px]"
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
