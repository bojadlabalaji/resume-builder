'use client'

import { useState } from 'react'
import { X, FileText, File, Search } from 'lucide-react'

interface Document {
    id: string
    type: 'resume' | 'cover_letter'
    title: string
    preview: string
    updatedAt: string
}

interface DocumentSelectorProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (document: Document) => void
    type?: 'resume' | 'cover_letter' | 'all'
}

export function DocumentSelector({ isOpen, onClose, onSelect, type = 'all' }: DocumentSelectorProps) {
    const [searchQuery, setSearchQuery] = useState('')

    // Mock data - will be replaced with API call
    const mockDocuments: Document[] = [
        {
            id: '1',
            type: 'resume',
            title: 'Software Engineer Resume',
            preview: 'Senior Software Engineer with 5+ years experience...',
            updatedAt: '2 days ago'
        },
        {
            id: '2',
            type: 'resume',
            title: 'Product Manager Resume',
            preview: 'Product Manager with expertise in agile...',
            updatedAt: '1 week ago'
        },
        {
            id: '3',
            type: 'cover_letter',
            title: 'Microsoft Cover Letter',
            preview: 'I am writing to express my interest...',
            updatedAt: '3 days ago'
        },
    ]

    const filteredDocuments = mockDocuments.filter((doc) => {
        if (type !== 'all' && doc.type !== type) return false
        if (searchQuery && !doc.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
        return true
    })

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-[#2f2f2f] rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#3f3f3f]">
                    <h2 className="text-xl font-semibold text-white">
                        Select {type === 'all' ? 'Document' : type === 'resume' ? 'Resume' : 'Cover Letter'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#3f3f3f] rounded-lg transition-colors text-white/70 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-[#3f3f3f]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search documents..."
                            className="w-full bg-[#3f3f3f] text-white placeholder:text-white/40 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#FFD600]"
                        />
                    </div>
                </div>

                {/* Document List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {filteredDocuments.length === 0 ? (
                        <div className="text-center py-12 text-white/60">
                            <p>No documents found</p>
                        </div>
                    ) : (
                        filteredDocuments.map((doc) => (
                            <button
                                key={doc.id}
                                onClick={() => {
                                    onSelect(doc)
                                    onClose()
                                }}
                                className="w-full flex items-start gap-4 p-4 rounded-xl hover:bg-[#3f3f3f] transition-colors text-left group"
                            >
                                <div className="p-3 rounded-lg bg-[#3f3f3f] group-hover:bg-[#4f4f4f] transition-colors">
                                    {doc.type === 'resume' ? (
                                        <FileText className="w-6 h-6 text-[#FFD600]" />
                                    ) : (
                                        <File className="w-6 h-6 text-[#FFD600]" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-white mb-1">{doc.title}</h3>
                                    <p className="text-sm text-white/60 line-clamp-2">{doc.preview}</p>
                                    <p className="text-xs text-white/40 mt-1">Updated {doc.updatedAt}</p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
