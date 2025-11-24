"use client"

import Link from "next/link"
import { FileText, LogOut, User } from "lucide-react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Button } from "@/components/ui/Button"
import { useEffect, useState } from "react"
import { isAuthenticated, logout } from "@/services/authService"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true)
        setIsLoggedIn(isAuthenticated())
    }, [pathname])

    const handleLogout = () => {
        logout()
        setIsLoggedIn(false)
    }

    // Prevent hydration mismatch
    if (!mounted) {
        return null
    }

    const isDark = resolvedTheme === "dark"

    return (
        <header
            className={cn(
                "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full border backdrop-blur-md shadow-lg transition-colors duration-300",
                isDark
                    ? "border-gold-800/50 bg-black/90 shadow-gold-500/5"
                    : "border-black/50 bg-white/60 shadow-grey-500/5"
            )}
        >
            <div className="flex h-14 items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gold-500" />
                    <span className="text-lg font-bold tracking-tight text-gold-700">Remo</span>
                </Link>
                <nav className="hidden gap-2 md:flex items-center">
                    <Link
                        href="/builder"
                        className={cn(
                            "text-sm font-medium px-4 py-2 rounded-full transition-all",
                            pathname === "/builder"
                                ? "bg-gold-500 text-white shadow-md shadow-gold-500/20 hover:bg-gold-600 dark:text-black"
                                : "text-muted-foreground hover:text-gold-500 hover:bg-gold-50/50 dark:hover:bg-gold-900/10"
                        )}
                    >
                        Builder
                    </Link>
                    {isLoggedIn && (
                        <Link
                            href="/profile"
                            className={cn(
                                "text-sm font-medium px-4 py-2 rounded-full transition-all flex items-center gap-2",
                                pathname === "/profile"
                                    ? "bg-gold-500 text-white shadow-md shadow-gold-500/20 hover:bg-gold-600 dark:text-black"
                                    : "text-muted-foreground hover:text-gold-500 hover:bg-gold-50/50 dark:hover:bg-gold-900/10"
                            )}
                        >
                            <User className="h-4 w-4" />
                            Profile
                        </Link>
                    )}
                    <Link
                        href="/#features"
                        className={cn(
                            "text-sm font-medium px-4 py-2 rounded-full transition-all",
                            pathname === "/"
                                ? "text-muted-foreground hover:text-gold-500 hover:bg-gold-50/50 dark:hover:bg-gold-900/10"
                                : "text-muted-foreground hover:text-gold-500 hover:bg-gold-50/50 dark:hover:bg-gold-900/10"
                        )}
                    >
                        Features
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {isLoggedIn ? (
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
