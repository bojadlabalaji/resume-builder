import { useState, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Upload, FileText, X, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadBlockProps {
    onFileSelect: (file: File | null) => void
    selectedFile: File | null
}

const MOCK_RESUMES = [
    { id: 1, name: "Software Engineer Resume.pdf", date: "2023-10-27" },
    { id: 2, name: "Product Manager Resume.docx", date: "2023-09-15" },
    { id: 3, name: "Data Scientist Resume.pdf", date: "2023-08-01" },
]

export function UploadBlock({ onFileSelect, selectedFile }: UploadBlockProps) {
    const [mode, setMode] = useState<'upload' | 'select'>('upload')
    const [dragActive, setDragActive] = useState(false)
    const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0])
        }
    }

    const removeFile = () => {
        onFileSelect(null)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                        <Upload className="w-5 h-5 text-gold-500" />
                        Base Resume
                    </CardTitle>
                    <CardDescription>
                        {mode === 'upload' ? 'Upload a new file (PDF/DOCX)' : 'Select from your resume library'}
                    </CardDescription>
                </div>
                <div className="flex bg-muted rounded-lg p-1 shrink-0">
                    <button
                        onClick={() => setMode('upload')}
                        className={cn(
                            "px-3 py-1 text-xs font-medium rounded-md transition-all",
                            mode === 'upload'
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Upload New
                    </button>
                    <button
                        onClick={() => setMode('select')}
                        className={cn(
                            "px-3 py-1 text-xs font-medium rounded-md transition-all",
                            mode === 'select'
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Select Existing
                    </button>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center pt-4">
                {mode === 'upload' ? (
                    !selectedFile ? (
                        <div
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200",
                                dragActive
                                    ? "border-gold-500 bg-gold-50/30"
                                    : "border-muted-foreground/25 hover:border-gold-500 hover:bg-gold-50/10"
                            )}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => inputRef.current?.click()}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className={cn("w-8 h-8 mb-3 transition-colors", dragActive ? "text-gold-600" : "text-gold-500")} />
                                <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold text-foreground">Click to upload</span> or drag and drop
                                </p>
                            </div>
                            <input
                                ref={inputRef}
                                type="file"
                                className="hidden"
                                accept=".pdf,.docx"
                                onChange={handleChange}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-between p-4 border rounded-lg border-gold-200 bg-gold-50/30 dark:border-gold-800 dark:bg-gold-900/10">
                            <div className="flex items-center space-x-3 overflow-hidden">
                                <div className="p-2 rounded-full bg-gold-100 dark:bg-gold-900/30 shrink-0">
                                    <FileText className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {selectedFile.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={removeFile} className="shrink-0 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    )
                ) : (
                    <div className="space-y-3">
                        <div className="relative w-full">
                            <select
                                className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                                value={selectedResumeId || ""}
                                onChange={(e) => setSelectedResumeId(Number(e.target.value))}
                            >
                                <option value="" disabled>Select a resume...</option>
                                {MOCK_RESUMES.map((resume) => (
                                    <option key={resume.id} value={resume.id}>
                                        {resume.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
                        </div>
                        {selectedResumeId && (
                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-900">
                                <Check className="w-4 h-4" />
                                <span>Resume selected</span>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card >
    )
}
