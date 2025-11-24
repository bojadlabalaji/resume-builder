"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/Button"
import { UploadBlock } from "@/components/builder/UploadBlock"
import { JobDescriptionBlock } from "@/components/builder/JobDescriptionBlock"
import { AtsFeedbackBlock } from "@/components/builder/AtsFeedbackBlock"
import { OptionsBlock } from "@/components/builder/OptionsBlock"
import { ResultModal } from "@/components/builder/ResultModal"
import { generateResume, type GenerateResumeResponse } from "@/services/resumeService"
import { Wand2 } from "lucide-react"

export default function BuilderPage() {
    const [file, setFile] = useState<File | null>(null)
    const [jobDescription, setJobDescription] = useState("")
    const [templateId, setTemplateId] = useState(1)
    const [length, setLength] = useState("1 page")
    const [atsFeedback, setAtsFeedback] = useState("")

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [resultData, setResultData] = useState<GenerateResumeResponse | null>(null)
    const [error, setError] = useState("")

    const handleGenerate = async () => {
        if (!file) {
            setError("Please upload a resume first.")
            setStatus('error')
            return
        }
        if (!jobDescription.trim()) {
            setError("Please enter a job description.")
            setStatus('error')
            return
        }

        setStatus('loading')
        try {
            const data = await generateResume(file, jobDescription, templateId, atsFeedback)
            setResultData(data)
            setStatus('success')
        } catch (err) {
            console.error(err)
            setError("Failed to generate resume. Please try again.")
            setStatus('error')
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-background items-center">
            <Navbar />
            <main className="flex-1 container py-10 px-4 md:px-6 pt-24">
                <div className="max-w-5xl mx-auto space-y-8 flex flex-col items-center">
                    <div className="text-center space-y-2 max-w-2xl">
                        <h1 className="text-3xl font-bold tracking-tight text-gold-700">Resume Optimizer</h1>
                        <p className="text-muted-foreground">
                            Configure your preferences and let AI optimize your resume.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <UploadBlock
                            selectedFile={file}
                            onFileSelect={setFile}
                        />
                        <JobDescriptionBlock
                            value={jobDescription}
                            onChange={setJobDescription}
                        />
                        <AtsFeedbackBlock
                            value={atsFeedback}
                            onChange={setAtsFeedback}
                        />
                        <OptionsBlock
                            length={length}
                            setLength={setLength}
                            templateId={templateId}
                            setTemplateId={setTemplateId}
                        />
                    </div>

                    <div className="flex justify-center pt-12 pb-12">
                        <Button
                            size="lg"
                            className="w-full max-w-md h-14 text-lg font-semibold shadow-lg shadow-gold-500/20 hover:shadow-gold-500/30 transition-all"
                            onClick={handleGenerate}
                            disabled={status === 'loading'}
                        >
                            <Wand2 className="mr-2 h-5 w-5" />
                            Generate Resume
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />

            <ResultModal
                status={status}
                data={resultData}
                error={error}
                onClose={() => setStatus('idle')}
            />
        </div>
    )
}
