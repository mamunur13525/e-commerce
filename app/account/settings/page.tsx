"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Add01Icon, Delete02Icon, Location01Icon, CheckmarkCircle02Icon } from "hugeicons-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Address = {
    id: string;
    type: "Home" | "Work" | "Other";
    street: string;
    city: string;
    state: string;
    zip: string;
    isDefault: boolean;
};

const INITIAL_ADDRESSES: Address[] = [
    {
        id: "1",
        type: "Home",
        street: "123 Green Street, Apt 4B",
        city: "New York",
        state: "NY",
        zip: "10001",
        isDefault: true,
    },
    {
        id: "2",
        type: "Work",
        street: "456 Business Blvd, Floor 10",
        city: "New York",
        state: "NY",
        zip: "10002",
        isDefault: false,
    },
];

export default function SettingsPage() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    // Form state for new address
    const [newAddress, setNewAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: "",
        type: "Home"
    });

    // Simulate fetching data
    useEffect(() => {
        const timer = setTimeout(() => {
            setAddresses(INITIAL_ADDRESSES);
            setIsLoading(false);
        }, 1500); // 1.5s delay to show skeleton
        return () => clearTimeout(timer);
    }, []);

    const handleSetDefault = (id: string) => {
        setAddresses(prev => prev.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    const handleRemove = (id: string) => {
        setAddresses(prev => prev.filter(addr => addr.id !== id));
    };

    const handleAddAddress = () => {
        const id = Math.random().toString(36).substr(2, 9);
        const addressToAdd: Address = {
            id,
            ...newAddress,
            type: newAddress.type as "Home" | "Work" | "Other",
            isDefault: addresses.length === 0 // Make default if it's the first one
        };
        setAddresses([...addresses, addressToAdd]);
        setIsAddDialogOpen(false);
        // Reset form
        setNewAddress({ street: "", city: "", state: "", zip: "", type: "Home" });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#003d29]">Settings</h1>
                    <p className="text-gray-500">Manage your delivery addresses and preferences.</p>
                </div>
            </div>

            {/* Delivery Addresses */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#003d29]">Delivery Addresses</h2>

                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger render={
                            <Button variant="outline" className="gap-2 text-[#003d29] border-[#003d29] hover:bg-[#003d29]/5">
                                <Add01Icon className="size-4" />
                                Add New Address
                            </Button>
                        } />
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Delivery Address</DialogTitle>
                                <DialogDescription>
                                    Add a new address to your account for faster checkout.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="street">Street Address</Label>
                                    <Input
                                        id="street"
                                        value={newAddress.street}
                                        onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
                                        placeholder="123 Main St"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            value={newAddress.city}
                                            onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                                            placeholder="New York"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state">State</Label>
                                        <Input
                                            id="state"
                                            value={newAddress.state}
                                            onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                                            placeholder="NY"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">Zip Code</Label>
                                    <Input
                                        id="zip"
                                        value={newAddress.zip}
                                        onChange={e => setNewAddress({ ...newAddress, zip: e.target.value })}
                                        placeholder="10001"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Address Type</Label>
                                    <select
                                        id="type"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={newAddress.type}
                                        onChange={e => setNewAddress({ ...newAddress, type: e.target.value })}
                                    >
                                        <option value="Home">Home</option>
                                        <option value="Work">Work</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddAddress} className="bg-[#003d29] hover:bg-[#002a1c] text-white w-full">Save Address</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-4">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-24 w-full rounded-lg" />
                            <Skeleton className="h-24 w-full rounded-lg" />
                        </>
                    ) : (
                        addresses.map((addr) => (
                            <div
                                key={addr.id}
                                className={cn(
                                    "flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border transition-all",
                                    addr.isDefault
                                        ? "border-[#aedf4d] bg-[#f7fdec]"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                )}
                            >
                                <div className="flex items-start gap-4 mb-4 md:mb-0">
                                    <div className={cn(
                                        "p-2 rounded-full",
                                        addr.isDefault ? "bg-[#aedf4d] text-[#003d29]" : "bg-gray-100 text-gray-500"
                                    )}>
                                        <Location01Icon className="size-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-[#003d29]">{addr.type}</h4>
                                            {addr.isDefault && (
                                                <span className="text-[10px] font-bold bg-[#003d29] text-white px-2 py-0.5 rounded-full">DEFAULT</span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-sm mt-1">{addr.street}</p>
                                        <p className="text-gray-500 text-sm">{addr.city}, {addr.state} {addr.zip}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {!addr.isDefault && (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleSetDefault(addr.id)}
                                                className="text-gray-500 hover:text-[#003d29]"
                                            >
                                                Set as Default
                                            </Button>
                                            <div className="h-4 w-px bg-gray-200" />
                                        </>
                                    )}

                                    <AlertDialog>
                                        <AlertDialogTrigger render={
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <Delete02Icon className="size-4" />
                                            </Button>
                                        } />
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your address from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleRemove(addr.id)} className="bg-red-600 text-white hover:bg-red-700 hover:text-white border-red-600">
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))
                    )}

                    {!isLoading && addresses.length === 0 && (
                        <div className="text-center py-8 text-gray-500 border border-dashed border-gray-200 rounded-lg">
                            No addresses saved yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
