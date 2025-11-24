import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Textarea } from "@/components/ui/Textarea"
import { Briefcase } from "lucide-react"

interface JobDescriptionBlockProps {
    value: string
    onChange: (value: string) => void
}

export function JobDescriptionBlock({ value, onChange }: JobDescriptionBlockProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gold-500" />
                    Job Description
                </CardTitle>
                <CardDescription>
                    Paste the target job description here.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <Textarea
                    placeholder="Paste job description..."
                    className="h-full min-h-[160px] resize-none"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </CardContent>
        </Card>
    )
}
