import { useState, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Upload, FileText, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadStepProps {
    onFileSelect: (file: File) => void
    onNext: () => void
}

export function FileUploadStep({ onFileSelect, onNext }: FileUploadStepProps) {
    const [dragActive, setDragActive] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
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
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const handleFile = (file: File) => {
        // Validate file type if needed
        setSelectedFile(file)
        onFileSelect(file)
    }

    const removeFile = () => {
        setSelectedFile(null)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Upload Your Resume</CardTitle>
                <CardDescription>
                    Start by uploading your current resume. We accept PDF and DOCX files.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!selectedFile ? (
                    <div
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                            dragActive
                                ? "border-gold-500 bg-gold-100/20"
                                : "border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-12 h-12 mb-4 text-gold-500" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                PDF or DOCX (MAX. 10MB)
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
                    <div className="flex items-center justify-between p-4 border rounded-lg border-gold-100 bg-gold-100/10">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-full bg-gold-100">
                                <FileText className="w-6 h-6 text-gold-700" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {selectedFile.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={removeFile}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                )}

                <div className="flex justify-end">
                    <Button onClick={onNext} disabled={!selectedFile}>
                        Next Step
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
