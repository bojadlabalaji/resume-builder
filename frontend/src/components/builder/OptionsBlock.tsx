import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Settings2, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface OptionsBlockProps {
    length: string
    setLength: (val: string) => void
    templateId: number
    setTemplateId: (id: number) => void
}

const TEMPLATES = [
    { id: 1, name: "Template - 1" },
    { id: 2, name: "Template - 2" },
]

export function OptionsBlock({ length, setLength, templateId, setTemplateId }: OptionsBlockProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-gold-500" />
                    Options
                </CardTitle>
                <CardDescription>
                    Customize generation settings.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Template</label>
                    <div className="relative w-full">
                        <select
                            className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                            value={templateId}
                            onChange={(e) => setTemplateId(Number(e.target.value))}
                        >
                            {TEMPLATES.map((template) => (
                                <option key={template.id} value={template.id}>
                                    {template.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Resume Length</label>
                    <div className="grid grid-cols-2 gap-2">
                        {["1 page", "2 pages"].map((opt) => (
                            <div
                                key={opt}
                                className={cn(
                                    "cursor-pointer rounded-md border px-3 py-2 text-sm text-center transition-colors",
                                    length === opt
                                        ? "border-gold-500 bg-gold-50 text-gold-700 dark:bg-gold-900/20 dark:text-gold-500"
                                        : "border-input hover:bg-accent hover:text-accent-foreground"
                                )}
                                onClick={() => setLength(opt)}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
