'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, Mic, Send, X, Paperclip, FileText, File, Folder, Sparkles } from 'lucide-react'

interface ChatInputProps {
    onSendMessage?: (message: string) => void
    onCloseDocument?: () => void
    onOpenCanvas?: () => void
    selectedDocument?: {
        type: 'resume' | 'cover_letter'
        title: string
        hasContent: boolean
    } | null
    onMenuAction?: (action: 'upload' | 'resume' | 'cover_letter' | 'select_existing') => void
}

export function ChatInput({ onSendMessage, onCloseDocument, onOpenCanvas, selectedDocument, onMenuAction }: ChatInputProps) {
    const [message, setMessage] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const [showCloseButton, setShowCloseButton] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim()) {
            onSendMessage?.(message)
            setMessage('')
            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)

        // Auto-resize textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            const newHeight = Math.min(textareaRef.current.scrollHeight, 200) // Max 8 lines (~200px)
            textareaRef.current.style.height = `${newHeight}px`
        }
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            console.log('File selected:', file.name)
            onMenuAction?.('upload')
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false)
            }
        }

        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showMenu])

    const menuOptions = [
        {
            icon: Paperclip,
            label: 'Add files',
            shortcut: '⌘U',
            action: () => fileInputRef.current?.click()
        },
        {
            icon: FileText,
            label: 'Resume',
            shortcut: '',
            action: () => onMenuAction?.('resume')
        },
        {
            icon: File,
            label: 'Cover letter',
            shortcut: '',
            action: () => onMenuAction?.('cover_letter')
        },
        {
            icon: Folder,
            label: 'Select existing',
            shortcut: '',
            action: () => onMenuAction?.('select_existing')
        },
    ]

    return (
        <div className="border-t border-[#2f2f2f] bg-[#212121] px-4 py-4">
            <div className="max-w-3xl mx-auto">
                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileUpload}
                    className="hidden"
                />

                <form onSubmit={handleSubmit} className="relative">
                    {/* Textarea above controls */}
                    <div className="bg-[#2f2f2f] rounded-3xl focus-within:ring-2 focus-within:ring-[#FFD600] transition-all">
                        {/* Input Field */}
                        <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSubmit(e)
                                }
                            }}
                            placeholder="Message Resume Builder..."
                            className="w-full bg-transparent text-white placeholder:text-white/40 outline-none resize-none overflow-y-auto px-4 pt-4 pb-2 scrollbar-thin scrollbar-thumb-[#3f3f3f] scrollbar-track-transparent"
                            rows={1}
                            style={{
                                minHeight: '24px',
                                maxHeight: '200px',
                            }}
                        />

                        {/* Controls row */}
                        <div className="flex items-center gap-2 px-4 pb-3">
                            {/* Plus Menu Button */}
                            <div className="relative" ref={menuRef}>
                                <button
                                    type="button"
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="flex-shrink-0 p-2 hover:bg-[#3f3f3f] rounded-full transition-colors text-white/70 hover:text-white"
                                    aria-label="Add attachment"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>

                                {/* Dropdown Menu */}
                                {showMenu && (
                                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-[#2f2f2f] rounded-2xl shadow-2xl border border-[#3f3f3f] overflow-hidden animate-slide-up">
                                        {menuOptions.map((option, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => {
                                                    setShowMenu(false)
                                                    option.action()
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#3f3f3f] transition-colors text-white text-left"
                                            >
                                                <option.icon className="w-5 h-5 text-white/70" />
                                                <span className="flex-1 font-medium">{option.label}</span>
                                                {option.shortcut && (
                                                    <span className="text-sm text-white/40">{option.shortcut}</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Document Badge */}
                            {selectedDocument && (
                                <>
                                    <div
                                        className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 bg-[#3f3f3f] rounded-lg transition-all"
                                        onMouseEnter={() => setShowCloseButton(true)}
                                        onMouseLeave={() => setShowCloseButton(false)}
                                    >
                                        <FileText className="w-3.5 h-3.5 text-blue-400" />
                                        <span className="text-sm text-white/90">
                                            {selectedDocument.type === 'resume' ? 'Resume' : 'Cover letter'}
                                        </span>
                                        {showCloseButton && (
                                            <button
                                                type="button"
                                                onClick={onCloseDocument}
                                                className="p-0.5 hover:bg-[#4f4f4f] rounded transition-colors"
                                                aria-label="Close document"
                                            >
                                                <X className="w-3.5 h-3.5 text-white/70" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Open Canvas Button (if document has content) */}
                                    {selectedDocument.hasContent && (
                                        <button
                                            type="button"
                                            onClick={onOpenCanvas}
                                            className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 bg-[#3f3f3f] hover:bg-[#4f4f4f] rounded-lg transition-all text-white/90 text-sm"
                                        >
                                            <FileText className="w-3.5 h-3.5 text-blue-400" />
                                            <span>Open</span>
                                        </button>
                                    )}
                                </>
                            )}

                            <div className="flex-1" />

                            {/* Voice Input */}
                            <button
                                type="button"
                                className="flex-shrink-0 p-2 hover:bg-[#3f3f3f] rounded-full transition-colors text-white/70 hover:text-white"
                                aria-label="Voice input"
                            >
                                <Mic className="w-5 h-5" />
                            </button>

                            {/* Send Button */}
                            <button
                                type="submit"
                                disabled={!message.trim()}
                                className="flex-shrink-0 p-2 rounded-full bg-white text-black hover:bg-gray-200 disabled:bg-[#3f3f3f] disabled:text-white/30 transition-colors"
                                aria-label="Send message"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </form>

                {/* Disclaimer */}
                <p className="text-center text-xs text-white/40 mt-3">
                    Resume Builder can make mistakes. Check important info.
                </p>
            </div>
        </div>
    )
}
