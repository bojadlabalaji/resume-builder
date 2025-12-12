'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    PanelLeft,
    Plus,
    MessageSquare,
    User,
    LogOut,
    Settings,
    MoreHorizontal
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

interface Chat {
    id: string
    title: string
}

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { user, logout } = useAuth()
    const [chats] = useState<Chat[]>([
        { id: '1', title: 'Software Engineer Resume' },
        { id: '2', title: 'Product Manager CV' },
    ])

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`${isCollapsed ? 'w-0' : 'w-[260px]'
                    } transition-all duration-300 bg-[#171717] border-r border-[#2f2f2f] flex flex-col h-screen overflow-hidden group`}
            >
                {!isCollapsed && (
                    <div className="flex flex-col h-full">
                        {/* Header: Logo and Collapse */}
                        <div className="flex items-center justify-between p-3 px-4">
                            {/* Logo Placeholder (User said "left end os side bar shold be logo") */}
                            <div className="flex items-center gap-2 text-white font-semibold">
                                <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold">
                                    R
                                </div>
                                <span>Remo</span>
                            </div>

                            <button
                                onClick={() => setIsCollapsed(true)}
                                className="p-2 rounded-lg hover:bg-[#2f2f2f] text-white/70 hover:text-white transition-colors"
                                title="Close sidebar"
                            >
                                <PanelLeft className="w-5 h-5" />
                            </button>
                        </div>

                        {/* New Chat Button */}
                        <div className="px-3 pb-2">
                            <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2f2f2f] transition-colors text-white text-sm border border-transparent hover:border-[#3f3f3f]">
                                <Plus className="w-4 h-4" />
                                <span className="font-medium">New chat</span>
                            </Link>
                        </div>


                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin">
                            <div className="space-y-1">
                                <h3 className="px-3 text-xs font-semibold text-white/40 mb-2 mt-4">
                                    Recent
                                </h3>
                                {chats.map((chat) => (
                                    <button
                                        key={chat.id}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2f2f2f] transition-colors text-white/70 hover:text-white text-sm text-left group/item"
                                    >
                                        <MessageSquare className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate flex-1">{chat.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer / User Section */}
                        <div className="p-3 border-t border-[#2f2f2f]">
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#2f2f2f] transition-colors text-white text-sm">
                                            <Avatar className="w-8 h-8 rounded-sm">
                                                <AvatarImage src="" />
                                                <AvatarFallback className="bg-[#5436DA] text-white rounded-sm">
                                                    {user.username?.[0]?.toUpperCase() || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 text-left truncate">
                                                <div className="font-medium">{user.username}</div>
                                                <div className="text-xs text-white/50">Free Plan</div>
                                            </div>
                                            <MoreHorizontal className="w-4 h-4 text-white/50" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[240px] bg-[#2f2f2f] border-[#3f3f3f] text-white">
                                        <DropdownMenuItem className="focus:bg-[#3f3f3f] cursor-pointer">
                                            <User className="w-4 h-4 mr-2" />
                                            <Link href="/profile">Profile & Settings</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="focus:bg-[#3f3f3f] cursor-pointer text-red-400 focus:text-red-400" onClick={logout}>
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link href="/login">
                                    <Button variant="secondary" className="w-full justify-start text-white bg-[#2f2f2f] hover:bg-[#3f3f3f]">
                                        <User className="w-4 h-4 mr-2" />
                                        Sign In
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </aside>

            {/* Floating Toggle Button (Visible when collapsed) */}
            {isCollapsed && (
                <button
                    onClick={() => setIsCollapsed(false)}
                    className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#2f2f2f] hover:bg-[#3f3f3f] transition-colors text-white shadow-lg"
                >
                    <PanelLeft className="w-5 h-5" />
                </button>
            )}
        </>
    )
}
