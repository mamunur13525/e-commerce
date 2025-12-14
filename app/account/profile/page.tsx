"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

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
                <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-4">
                    <h2 className="text-lg font-bold text-[#003d29]">Personal Information</h2>
                    <Separator />
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input id="full-name" defaultValue="John Doe" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" defaultValue="john.doe@example.com" disabled className="bg-gray-50 text-gray-500" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" defaultValue="+1 (555) 000-0000" placeholder="Enter your phone number" />
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-4">
                    <h2 className="text-lg font-bold text-[#003d29]">Security</h2>
                    <Separator />
                    <div className="grid gap-4 max-w-md">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" placeholder="Enter new password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                        </div>
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
