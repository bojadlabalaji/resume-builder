'use client'

import { X, Download, Copy, Undo, Redo, Share } from 'lucide-react'

interface CanvasProps {
    isOpen: boolean
    onClose: () => void
    content: string
    title?: string
}

export function Canvas({ isOpen, onClose, content, title = 'Resume Preview' }: CanvasProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-y-0 right-0 w-full md:w-[50%] bg-[#2f2f2f] border-l border-[#3f3f3f] flex flex-col z-40 animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#3f3f3f]">
                <div className="flex items-center gap-3">
                    <h2 className="text-white font-semibold">{title}</h2>
                </div>

                <div className="flex items-center gap-2">
                    {/* Action Buttons */}
                    <button
                        className="p-2 hover:bg-[#3f3f3f] rounded-lg transition-colors text-white/70 hover:text-white"
                        aria-label="Undo"
                    >
                        <Undo className="w-4 h-4" />
                    </button>
                    <button
                        className="p-2 hover:bg-[#3f3f3f] rounded-lg transition-colors text-white/70 hover:text-white"
                        aria-label="Redo"
                    >
                        <Redo className="w-4 h-4" />
                    </button>
                    <button
                        className="p-2 hover:bg-[#3f3f3f] rounded-lg transition-colors text-white/70 hover:text-white"
                        aria-label="Copy"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                    <button
                        className="p-2 hover:bg-[#3f3f3f] rounded-lg transition-colors text-white/70 hover:text-white"
                        aria-label="Download"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                    <button
                        className="p-2 hover:bg-[#3f3f3f] rounded-lg transition-colors text-white/70 hover:text-white"
                        aria-label="Share"
                    >
                        <Share className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-[#3f3f3f] mx-1"></div>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#3f3f3f] rounded-lg transition-colors text-white/70 hover:text-white"
                        aria-label="Close canvas"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-8 min-h-[1100px]">
                    {/* Resume Content */}
                    {content ? (
                        <div className="prose prose-sm max-w-none">
                            <div className="text-black whitespace-pre-wrap">{content}</div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2 text-gray-600">Resume Preview</h3>
                                <p className="text-sm">Your generated resume will appear here</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#3f3f3f] px-6 py-3 bg-[#2f2f2f]">
                <div className="flex items-center justify-between">
                    <p className="text-xs text-white/40">
                        Preview • Auto-saved
                    </p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
