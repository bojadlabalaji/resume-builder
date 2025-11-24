import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background items-center">
            <Navbar />
            <main className="flex-1 container flex items-center justify-center py-10 px-4 md:px-6">
                <LoginForm />
            </main>
            <Footer />
        </div>
    )
}
