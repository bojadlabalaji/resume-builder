'use client'

import { useState } from 'react'
import { ChatInput } from './ChatInput'
import { Canvas } from './Canvas'
import { DocumentSelector } from './DocumentSelector'
import { Sparkles, Upload, FileText, Wand2 } from 'lucide-react'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}

interface Document {
    id: string
    type: 'resume' | 'cover_letter'
    title: string
    preview: string
    updatedAt: string
}

export function ChatArea() {
    const [messages, setMessages] = useState<Message[]>([])
    const [isCanvasOpen, setIsCanvasOpen] = useState(false)
    const [canvasContent, setCanvasContent] = useState('')
    const [selectedDocument, setSelectedDocument] = useState<{
        type: 'resume' | 'cover_letter'
        title: string
        hasContent: boolean
    } | null>(null)
    const [showDocumentSelector, setShowDocumentSelector] = useState(false)
    const [selectorType, setSelectorType] = useState<'resume' | 'cover_letter' | 'all'>('all')

    const handleSendMessage = (content: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
        }
        setMessages([...messages, newMessage])

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'll help you create a professional resume. Please upload your existing resume or tell me about your experience.",
            }
            setMessages((prev) => [...prev, aiMessage])

            // Simulate resume generation after user types "generate" 
            if (content.toLowerCase().includes('generate') || content.toLowerCase().includes('create')) {
                // Simulate AI generation delay
                setTimeout(() => {
                    setCanvasContent('# Sample Resume\n\n## John Doe\n\nSoftware Engineer with 5+ years experience...')
                    // Mark document as having content
                    if (selectedDocument) {
                        setSelectedDocument({
                            ...selectedDocument,
                            hasContent: true
                        })
                    }
                    // Auto-open canvas when generation completes
                    setIsCanvasOpen(true)
                }, 2000)
            }
        }, 1000)
    }

    const handleMenuAction = (action: 'upload' | 'resume' | 'cover_letter' | 'select_existing') => {
        switch (action) {
            case 'upload':
                // Simulate file upload
                const uploadMessage: Message = {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: "I've received your file. I'm analyzing it now and will create an optimized version for you."
                }
                setMessages((prev) => [...prev, uploadMessage])

                // Select resume but DON'T open canvas yet
                setSelectedDocument({ type: 'resume', title: 'Uploaded Resume', hasContent: false })

                // Mock: Process file and then open canvas with results
                setTimeout(() => {
                    setCanvasContent('# John Doe\n\n## Software Engineer\n\nExperienced software engineer...')
                    setSelectedDocument({ type: 'resume', title: 'Uploaded Resume', hasContent: true })
                    setIsCanvasOpen(true)
                }, 2000)
                break

            case 'resume':
                // Create new resume - just select, DON'T open canvas
                const resumeMessage: Message = {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: "Let's create a new resume! What position are you applying for?"
                }
                setMessages((prev) => [...prev, resumeMessage])
                setSelectedDocument({ type: 'resume', title: 'New Resume', hasContent: false })
                // Canvas will open after user sends message and generation completes
                break

            case 'cover_letter':
                // Create new cover letter - just select, DON'T open canvas
                const coverLetterMessage: Message = {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: "Let's create a cover letter! Tell me about the company and position."
                }
                setMessages((prev) => [...prev, coverLetterMessage])
                setSelectedDocument({ type: 'cover_letter', title: 'New Cover Letter', hasContent: false })
                // Canvas will open after user sends message and generation completes
                break

            case 'select_existing':
                // Open document selector
                setSelectorType('all')
                setShowDocumentSelector(true)
                break
        }
    }

    const handleDocumentSelect = (document: Document) => {
        const selectMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: `I've loaded "${document.title}". How can I help improve it?`
        }
        setMessages((prev) => [...prev, selectMessage])

        // Select document with content (existing docs have content)
        setSelectedDocument({
            type: document.type,
            title: document.title,
            hasContent: true // Existing documents have content
        })
        setCanvasContent(document.preview)
        // Don't auto-open canvas - user can click "Open" button
    }

    const handleOpenCanvas = () => {
        setIsCanvasOpen(true)
    }

    const handleCloseDocument = () => {
        setSelectedDocument(null)
        setCanvasContent('')
        setIsCanvasOpen(false)
    }

    return (
        <>
            <div className={`flex flex-col h-screen bg-[#212121] transition-all duration-300 ${isCanvasOpen ? 'md:w-[30%]' : 'w-full'}`}>
                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto">
                    {messages.length === 0 ? (
                        // Empty State
                        <div className="flex flex-col items-center justify-center h-full px-4">
                            <div className="max-w-2xl w-full space-y-8">
                                {/* Header */}
                                <div className="text-center space-y-4">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFD600] rounded-full mb-4">
                                        <Sparkles className="w-8 h-8 text-black" />
                                    </div>
                                    <h1 className="text-4xl font-semibold text-white">
                                        What can I help with?
                                    </h1>
                                </div>

                                {/* Quick Actions */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
                                    <button
                                        onClick={() => handleMenuAction('upload')}
                                        className="group p-4 rounded-2xl bg-[#2f2f2f] hover:bg-[#3f3f3f] transition-all text-left border border-transparent hover:border-[#FFD600]/20"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-[#3f3f3f] group-hover:bg-[#4f4f4f] transition-colors">
                                                <Upload className="w-5 h-5 text-[#FFD600]" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-white mb-1">Upload resume</h3>
                                                <p className="text-sm text-white/60">
                                                    Start by uploading your existing resume
                                                </p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handleMenuAction('resume')}
                                        className="group p-4 rounded-2xl bg-[#2f2f2f] hover:bg-[#3f3f3f] transition-all text-left border border-transparent hover:border-[#FFD600]/20"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-[#3f3f3f] group-hover:bg-[#4f4f4f] transition-colors">
                                                <FileText className="w-5 h-5 text-[#FFD600]" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-white mb-1">Start from scratch</h3>
                                                <p className="text-sm text-white/60">
                                                    Create a new resume from your profile
                                                </p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handleMenuAction('cover_letter')}
                                        className="group p-4 rounded-2xl bg-[#2f2f2f] hover:bg-[#3f3f3f] transition-all text-left border border-transparent hover:border-[#FFD600]/20"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-[#3f3f3f] group-hover:bg-[#4f4f4f] transition-colors">
                                                <Wand2 className="w-5 h-5 text-[#FFD600]" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-white mb-1">Cover letter</h3>
                                                <p className="text-sm text-white/60">
                                                    Create a compelling cover letter
                                                </p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handleMenuAction('select_existing')}
                                        className="group p-4 rounded-2xl bg-[#2f2f2f] hover:bg-[#3f3f3f] transition-all text-left border border-transparent hover:border-[#FFD600]/20"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-[#3f3f3f] group-hover:bg-[#4f4f4f] transition-colors">
                                                <Sparkles className="w-5 h-5 text-[#FFD600]" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-white mb-1">Select existing</h3>
                                                <p className="text-sm text-white/60">
                                                    Choose from your saved documents
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Messages
                        <div className="max-w-3xl mx-auto px-4 py-8">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`mb-6 ${message.role === 'user' ? 'ml-auto max-w-[80%]' : 'mr-auto'
                                        }`}
                                >
                                    <div
                                        className={`rounded-2xl px-4 py-3 ${message.role === 'user'
                                            ? 'bg-[#2f2f2f] text-white'
                                            : 'bg-transparent text-white'
                                            }`}
                                    >
                                        {message.role === 'assistant' && (
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-6 h-6 bg-[#FFD600] rounded-full flex items-center justify-center">
                                                    <Sparkles className="w-4 h-4 text-black" />
                                                </div>
                                                <span className="text-sm font-medium">Resume Builder</span>
                                            </div>
                                        )}
                                        <p className="whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <ChatInput
                    onSendMessage={handleSendMessage}
                    onCloseDocument={handleCloseDocument}
                    onOpenCanvas={handleOpenCanvas}
                    selectedDocument={selectedDocument}
                    onMenuAction={handleMenuAction}
                />
            </div>

            {/* Canvas Panel */}
            <Canvas
                isOpen={isCanvasOpen}
                onClose={() => setIsCanvasOpen(false)}
                content={canvasContent}
                title={selectedDocument?.title || 'Document Preview'}
            />

            {/* Document Selector Modal */}
            <DocumentSelector
                isOpen={showDocumentSelector}
                onClose={() => setShowDocumentSelector(false)}
                onSelect={handleDocumentSelect}
                type={selectorType}
            />
        </>
    )
}
