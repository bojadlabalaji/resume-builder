"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import Link from 'next/link';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, isLoading } = useAuth();

    // Switch to register mode
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Basic validation
        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            await login(username, password);
        } catch (err: any) {
            setError(err.response?.data?.detail || "Authentication failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#171717] p-4">
            <Card className="w-full max-w-md bg-[#212121] border-[#2f2f2f] text-white">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        {isRegistering ? "Create an account" : "Welcome back"}
                    </CardTitle>
                    <CardDescription className="text-center text-gray-400">
                        {isRegistering
                            ? "Enter your email below to create your account"
                            : "Enter your email to sign in to your account"
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Email</Label>
                            <Input
                                id="username"
                                type="text" // Username or Email
                                placeholder="name@example.com"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-[#171717] border-[#3f3f3f] text-white"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-[#171717] border-[#3f3f3f] text-white"
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full bg-[#FFC400] text-black hover:bg-[#FFD600]" disabled={isLoading}>
                            {isLoading ? "Loading..." : (isRegistering ? "Sign Up" : "Sign In")}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center text-sm text-gray-400">
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-[#2f2f2f]" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#212121] px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    {/* Placeholder for OAuth if needed later */}

                    <div className="mt-2">
                        {isRegistering ? (
                            <>
                                Already have an account?{" "}
                                <button onClick={() => setIsRegistering(false)} className="text-[#FFC400] hover:underline">
                                    Sign in
                                </button>
                            </>
                        ) : (
                            <>
                                Don&apos;t have an account?{" "}
                                <button onClick={() => setIsRegistering(true)} className="text-[#FFC400] hover:underline">
                                    Sign up
                                </button>
                            </>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
