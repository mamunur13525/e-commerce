"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    return (
        <div className="bg-white p-8 w-full max-w-[480px]">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-500">Enter your email and password to access your account.</p>
            </div>

            <form className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="sellostore@company.com"
                        className="h-12 bg-white border-gray-200"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="font-medium">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type="password"
                            placeholder="sellostore."
                            className="h-12 bg-white border-gray-200 pr-10"
                        />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <span className="sr-only">Toggle password visibility</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="remember"
                            className="h-4 w-4 rounded border-gray-300 text-[#003d29] focus:ring-[#003d29]"
                        />
                        <label htmlFor="remember" className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Remember Me
                        </label>
                    </div>
                    <Link href="#" className="text-sm font-semibold text-blue-600 hover:underline">
                        Forgot Your Password?
                    </Link>
                </div>

                <Button className="w-full h-12 text-base font-semibold bg-[#003d29] hover:bg-[#002a1c] text-white shadow-md shadow-emerald-900/20">
                    Log In
                </Button>

                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-4 text-gray-500">Or Login With</span>
                    </div>
                </div>

                <div className="grid">
                    <Button variant="outline" type="button" className="h-12 border-gray-200 hover:bg-gray-50 bg-gray-50/50">
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </Button>

                </div>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500">Don't Have An Account? </span>
                    <Link href="/signup" className="font-semibold text-[#003d29] hover:underline">
                        Register Now.
                    </Link>
                </div>
            </form>
        </div>
    );
}
