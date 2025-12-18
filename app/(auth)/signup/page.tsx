"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleLogin from "@/components/auth/GoogleLogin";
import { useSignup } from "@/hooks/api/queries";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

export default function SignupPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { setAuth } = useAuthStore();
    const signupMutation = useSignup();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await signupMutation.mutateAsync({
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            });
            if (response.success && response.token && response.user) {
                setAuth(response.user, response.token);
                toast.success("Account created successfully!");
                router.push("/");
            }
        } catch (error: any) {
            toast.error(error.message || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="bg-white p-8 w-full max-w-[480px] border rounded-2xl">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-500">Join us to start shopping</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="first-name" className="font-medium">First Name</Label>
                    <Input
                        id="first-name"
                        type="text"
                        placeholder="John"
                        className="h-12 bg-white border-gray-200"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="last-name" className="font-medium">Last Name</Label>
                    <Input
                        id="last-name"
                        type="text"
                        placeholder="Doe"
                        className="h-12 bg-white border-gray-200"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="h-12 bg-white border-gray-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="font-medium">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-12 bg-white border-gray-200 pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <span className="sr-only">Toggle password visibility</span>
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="font-medium">Confirm Password</Label>
                    <div className="relative">
                        <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-12 bg-white border-gray-200 pr-10"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <span className="sr-only">Toggle password visibility</span>
                            {showConfirmPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid gap-3">
                    <Button
                        type="submit"
                        disabled={signupMutation.isPending}
                        className="w-full h-12 text-base font-semibold bg-[#003d29] hover:bg-[#002a1c] text-white shadow-md shadow-emerald-900/20 disabled:opacity-50"
                    >
                        {signupMutation.isPending ? "Creating Account..." : "Create Account"}
                    </Button>
                    <GoogleLogin />
                </div>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500">Already Have An Account? </span>
                    <Link href="/login" className="font-semibold text-[#003d29] hover:underline">
                        Log In Now.
                    </Link>
                </div>
            </form>
        </div>
    );
}
