import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Loader2, Download, CheckCircle, AlertCircle, X } from "lucide-react"
import { GenerateResumeResponse, downloadResume } from "@/services/resumeService"

interface ResultModalProps {
    status: 'idle' | 'loading' | 'success' | 'error'
    data: GenerateResumeResponse | null
    error: string
    onClose: () => void
}

export function ResultModal({ status, data, error, onClose }: ResultModalProps) {
    if (status === 'idle') return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <Card className="w-full max-w-md relative animate-in fade-in zoom-in duration-300">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={onClose}
                    disabled={status === 'loading'}
                >
                    <X className="w-4 h-4" />
                </Button>

                <CardContent className="pt-10 pb-8 flex flex-col items-center text-center space-y-4">
                    {status === 'loading' && (
                        <>
                            <Loader2 className="h-12 w-12 animate-spin text-gold-500" />
                            <h3 className="text-xl font-semibold">Generating...</h3>
                            <p className="text-sm text-muted-foreground">
                                Optimizing your resume with AI magic.
                            </p>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <AlertCircle className="h-12 w-12 text-red-500" />
                            <h3 className="text-xl font-semibold text-red-600">Generation Failed</h3>
                            <p className="text-sm text-muted-foreground">{error}</p>
                            <Button onClick={onClose} variant="outline" className="mt-2">
                                Close
                            </Button>
                        </>
                    )}

                    {status === 'success' && data && (
                        <>
                            <CheckCircle className="h-12 w-12 text-green-500" />
                            <h3 className="text-xl font-semibold text-green-600">Resume Ready!</h3>
                            <p className="text-sm text-muted-foreground">
                                Your optimized resume is ready for download.
                            </p>
                            <div className="flex gap-3 w-full mt-4">
                                <Button onClick={() => downloadResume(data.id, 'pdf')} className="flex-1 gap-2">
                                    <Download className="w-4 h-4" /> PDF
                                </Button>
                                <Button onClick={() => downloadResume(data.id, 'docx')} variant="outline" className="flex-1 gap-2">
                                    <Download className="w-4 h-4" /> DOCX
                                </Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
