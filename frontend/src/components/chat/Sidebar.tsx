'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    PanelLeft,
    Plus,
    Search,
    Library,
    Briefcase,
    User,
    FileText,
    Settings,
    LogOut
} from 'lucide-react'

interface Chat {
    id: string
    title: string
}

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [chats] = useState<Chat[]>([
        { id: '1', title: 'Software Engineer Resume' },
        { id: '2', title: 'Product Manager CV' },
        { id: '3', title: 'Data Scientist Application' },
    ])

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`${isCollapsed ? 'w-0' : 'w-[260px]'
                    } transition-all duration-300 bg-[#171717] border-r border-[#2f2f2f] flex flex-col h-screen overflow-hidden`}
            >
                {!isCollapsed && (
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="p-3 border-b border-[#2f2f2f]">
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2f2f2f] transition-colors text-white text-sm">
                                <Plus className="w-5 h-5" />
                                <span className="font-medium">New chat</span>
                            </button>
                        </div>

                        {/* Navigation Items */}
                        <div className="flex-1 overflow-y-auto px-3 py-2">
                            {/* Quick Actions */}
                            <div className="space-y-1 mb-4">
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2f2f2f] transition-colors text-white/70 hover:text-white text-sm"
                                >
                                    <Search className="w-4 h-4" />
                                    <span>Search chats</span>
                                </Link>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2f2f2f] transition-colors text-white/70 hover:text-white text-sm"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Profile</span>
                                </Link>
                                <Link
                                    href="/library"
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2f2f2f] transition-colors text-white/70 hover:text-white text-sm"
                                >
                                    <Library className="w-4 h-4" />
                                    <span>Library</span>
                                </Link>
                                <Link
                                    href="/projects"
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2f2f2f] transition-colors text-white/70 hover:text-white text-sm"
                                >
                                    <Briefcase className="w-4 h-4" />
                                    <span>Projects</span>
                                </Link>
                            </div>

                            {/* Chat History */}
                            <div className="pt-4 border-t border-[#2f2f2f]">
                                <h3 className="px-3 text-xs font-semibold text-white/40 mb-2">
                                    Your chats
                                </h3>
                                <div className="space-y-1">
                                    {chats.map((chat) => (
                                        <button
                                            key={chat.id}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2f2f2f] transition-colors text-white/70 hover:text-white text-sm text-left"
                                        >
                                            <FileText className="w-4 h-4 flex-shrink-0" />
                                            <span className="truncate">{chat.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer / User Section */}
                        <div className="border-t border-[#2f2f2f] p-3">
                            <div className="space-y-1">
                                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2f2f2f] transition-colors text-white/70 hover:text-white text-sm">
                                    <Settings className="w-4 h-4" />
                                    <span>Settings</span>
                                </button>
                                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2f2f2f] transition-colors text-white/70 hover:text-white text-sm">
                                    <LogOut className="w-4 h-4" />
                                    <span>Log out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </aside>

            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#2f2f2f] hover:bg-[#3f3f3f] transition-colors text-white"
            >
                <PanelLeft className="w-5 h-5" />
            </button>
        </>
    )
}
