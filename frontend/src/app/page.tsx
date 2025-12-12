import { Sidebar } from "@/components/chat/Sidebar"
import { ChatArea } from "@/components/chat/ChatArea"
import { ResumeProvider } from "@/context/ResumeContext"

export default function Home() {
  return (
    <ResumeProvider>
      <div className="flex h-screen bg-[#212121] overflow-hidden">
        <Sidebar />
        <main className="flex-1">
          <ChatArea />
        </main>
      </div>
    </ResumeProvider>
  )
}
