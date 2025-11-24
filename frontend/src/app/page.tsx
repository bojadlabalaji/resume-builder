import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Upload, Wand2, FileCheck } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center px-4 md:px-6">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gold-700">
              Optimize Your Career with <span className="text-gold-500">Remo</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Create professional, tailored resumes in minutes using our AI-powered optimizer.
              Stand out from the crowd with premium designs.
            </p>
            <div className="space-x-4">
              <Link href="/builder">
                <Button size="lg" className="h-12 px-8 text-lg">
                  Build Your Resume
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 px-4 md:px-6 rounded-3xl my-10">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold text-gold-700">
              How It Works
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Three simple steps to your dream job.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card>
              <CardHeader>
                <Upload className="h-10 w-10 text-gold-500 mb-2" />
                <CardTitle>1. Upload</CardTitle>
                <CardDescription>
                  Upload your existing resume or start from scratch. We support PDF and DOCX.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our system parses your data to create a comprehensive profile.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Wand2 className="h-10 w-10 text-gold-500 mb-2" />
                <CardTitle>2. Tailor</CardTitle>
                <CardDescription>
                  Paste the job description you're applying for.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  AI analyzes the job requirements and optimizes your resume keywords.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <FileCheck className="h-10 w-10 text-gold-500 mb-2" />
                <CardTitle>3. Generate</CardTitle>
                <CardDescription>
                  Choose a premium template and download your new resume.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get a polished, ATS-friendly resume ready for submission.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
