import { useEffect, useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Loader2, Download, CheckCircle, AlertCircle } from "lucide-react"
import { generateResume, downloadResume, type GenerateResumeResponse } from "@/services/resumeService"

interface GenerationStepProps {
    file: File
    jobDescription: string
    templateId: number
    onReset: () => void
}

export function GenerationStep({ file, jobDescription, templateId, onReset }: GenerationStepProps) {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [resumeData, setResumeData] = useState<GenerateResumeResponse | null>(null)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        const processGeneration = async () => {
            try {
                // 1. Upload File & Create Profile (Mocking this flow for now as per plan, but ideally should be separate)
                // Actually, the plan said: Step 1: Upload (POST /user-profile/), Step 4: Generate (POST /resume/generate-resume)
                // I need to implement the full flow here or in the parent.
                // Let's assume the parent handles the orchestration or I do it here.
                // Doing it here keeps the parent clean.

                // WAIT: The API requires a profile_id. So I must upload the file first to get a profile ID.
                // Then use that profile ID to generate the resume.

                // I'll implement this logic in the service or here.
                // Let's do it here.

                // For now, I'll just call a wrapper function in the service that does both if needed, 
                // or chain them here.

                const result = await generateResume(file, jobDescription, templateId);
                setResumeData(result);
                setStatus('success');
            } catch (err) {
                console.error(err);
                setError("Failed to generate resume. Please try again.");
                setStatus('error');
            }
        };

        processGeneration();
    }, [file, jobDescription, templateId]);

    const handleDownload = async (format: 'pdf' | 'docx') => {
        if (!resumeData) return;
        try {
            await downloadResume(resumeData.id, format);
        } catch (err) {
            console.error("Download failed", err);
        }
    }

    if (status === 'loading') {
        return (
            <Card className="w-full max-w-2xl mx-auto text-center py-12">
                <CardContent className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-16 w-16 animate-spin text-gold-500" />
                    <h3 className="text-2xl font-semibold text-gold-700">Generating Your Resume...</h3>
                    <p className="text-muted-foreground">
                        AI is analyzing your profile and the job description to create the perfect match.
                    </p>
                </CardContent>
            </Card>
        )
    }

    if (status === 'error') {
        return (
            <Card className="w-full max-w-2xl mx-auto text-center py-12 border-red-200 bg-red-50">
                <CardContent className="flex flex-col items-center space-y-4">
                    <AlertCircle className="h-16 w-16 text-red-500" />
                    <h3 className="text-2xl font-semibold text-red-700">Generation Failed</h3>
                    <p className="text-red-600">{error}</p>
                    <Button onClick={onReset} variant="outline" className="mt-4">
                        Try Again
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-2xl mx-auto text-center py-12 border-green-200 bg-green-50/30">
            <CardContent className="flex flex-col items-center space-y-6">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h3 className="text-2xl font-semibold text-green-700">Resume Ready!</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Your tailored resume has been successfully generated. You can now download it.
                </p>
                <div className="flex gap-4">
                    <Button onClick={() => handleDownload('pdf')} className="gap-2">
                        <Download className="w-4 h-4" /> Download PDF
                    </Button>
                    <Button onClick={() => handleDownload('docx')} variant="outline" className="gap-2">
                        <Download className="w-4 h-4" /> Download DOCX
                    </Button>
                </div>
                <Button variant="ghost" onClick={onReset} className="mt-8">
                    Create Another
                </Button>
            </CardContent>
        </Card>
    )
}
