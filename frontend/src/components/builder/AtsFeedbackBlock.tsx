import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Textarea } from "@/components/ui/Textarea"
import { FileSearch } from "lucide-react"

interface AtsFeedbackBlockProps {
    value: string
    onChange: (value: string) => void
}

export function AtsFeedbackBlock({ value, onChange }: AtsFeedbackBlockProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileSearch className="w-5 h-5 text-gold-500" />
                    ATS Feedback
                </CardTitle>
                <CardDescription>
                    Paste any specific ATS requirements or feedback.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <Textarea
                    placeholder="Paste ATS feedback or specific instructions..."
                    className="h-full min-h-[160px] resize-none"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </CardContent>
        </Card>
    )
}
