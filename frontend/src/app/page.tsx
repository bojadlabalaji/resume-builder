import { Sidebar } from "@/components/chat/Sidebar"
import { ChatArea } from "@/components/chat/ChatArea"

export default function Home() {
  return (
    <div className="flex h-screen bg-[#212121] overflow-hidden">
      <Sidebar />
      <main className="flex-1">
        <ChatArea />
      </main>
    </div>
  )
}
