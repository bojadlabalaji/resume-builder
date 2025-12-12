import { useRef } from 'react'
import { X, Download, Copy, Undo, Redo, Share2, Cloud, RefreshCw, MoreVertical, ChevronDown, Printer } from 'lucide-react'
import { useResume } from '@/context/ResumeContext'
import { ModernTemplate } from '../resume-templates/ModernTemplate'
import { useReactToPrint } from 'react-to-print'
import { generateDocx } from '@/utils/docxGenerator'

interface CanvasProps {
    isOpen: boolean
    onClose: () => void
    content: string
    title?: string
}

export function Canvas({ isOpen, onClose, content, title = 'Resume Preview' }: CanvasProps) {
    const { resumeData } = useResume()
    const contentRef = useRef<HTMLDivElement>(null)

    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        documentTitle: title,
    })

    const handleDownloadDocx = () => {
        if (resumeData) {
            generateDocx(resumeData)
        } else {
            alert("No resume data to download")
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-y-0 right-0 w-full md:w-[70%] bg-[#1a1a1a] flex flex-col z-40 animate-slide-in shadow-2xl">
            {/* Dark Toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1a1a] border-b border-[#2f2f2f]">
                {/* Left: Document Title */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <button className="flex items-center gap-2 px-2 py-1 hover:bg-[#2f2f2f] rounded-lg transition-colors min-w-0">
                        <span className="text-white text-sm truncate">{title}</span>
                    </button>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-1">
                    {/* Cloud Save */}
                    <button
                        className="p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-white/70 hover:text-white"
                        aria-label="Save to cloud"
                    >
                        <Cloud className="w-4 h-4" />
                    </button>

                    {/* Undo */}
                    <button
                        className="p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-white/70 hover:text-white"
                        aria-label="Undo"
                    >
                        <Undo className="w-4 h-4" />
                    </button>

                    {/* Redo */}
                    <button
                        className="p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-white/70 hover:text-white"
                        aria-label="Redo"
                    >
                        <Redo className="w-4 h-4" />
                    </button>

                    {/* More Options */}
                    <button
                        className="p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-white/70 hover:text-white"
                        aria-label="More options"
                    >
                        <MoreVertical className="w-4 h-4" />
                    </button>

                    {/* Print / PDF */}
                    <button
                        onClick={() => handlePrint()}
                        className="p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-white/70 hover:text-white"
                        aria-label="Print / Save as PDF"
                    >
                        <Printer className="w-4 h-4" />
                    </button>

                    {/* Download DOCX */}
                    <button
                        onClick={handleDownloadDocx}
                        className="p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-white/70 hover:text-white"
                        aria-label="Download DOCX"
                    >
                        <Download className="w-4 h-4" />
                    </button>

                    {/* Share */}
                    <button
                        className="p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-white/70 hover:text-white"
                        aria-label="Share"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>

                    {/* Create Dropdown */}
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium ml-1">
                        Create
                        <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-white/70 hover:text-white ml-1"
                        aria-label="Close canvas"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content Area with White Document Container */}
            <div className="flex-1 overflow-y-auto bg-[#1a1a1a] p-6">
                {/* White Rounded Document Container */}
                <div ref={contentRef} className="max-w-[210mm] mx-auto bg-white rounded-2xl shadow-xl min-h-[297mm] overflow-hidden">
                    {/* Document Content */}
                    {resumeData ? (
                        <ModernTemplate data={resumeData} />
                    ) : content ? (
                        <div className="p-12 prose prose-sm max-w-none">
                            <div className="text-black whitespace-pre-wrap">{content}</div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[600px] text-gray-400 p-12">
                            <div className="text-center">
                                <Copy className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                <h3 className="text-xl font-semibold mb-2 text-gray-600">Document Preview</h3>
                                <p className="text-sm">Your generated content will appear here</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
