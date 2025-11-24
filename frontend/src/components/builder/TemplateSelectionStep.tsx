import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface TemplateSelectionStepProps {
    onTemplateSelect: (templateId: number) => void
    onNext: () => void
    onBack: () => void
}

const TEMPLATES = [
    {
        id: 1,
        name: "Modern Gold",
        description: "Clean layout with gold accents, perfect for corporate roles.",
        color: "bg-white",
    },
    {
        id: 2,
        name: "Executive Dark",
        description: "Bold dark theme for senior positions.",
        color: "bg-slate-900",
    },
]

export function TemplateSelectionStep({ onTemplateSelect, onNext, onBack }: TemplateSelectionStepProps) {
    const [selectedId, setSelectedId] = useState<number>(1)

    const handleNext = () => {
        onTemplateSelect(selectedId)
        onNext()
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Select a Template</CardTitle>
                <CardDescription>
                    Choose a design that fits your style and the role you're applying for.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {TEMPLATES.map((template) => (
                        <div
                            key={template.id}
                            className={cn(
                                "relative cursor-pointer rounded-xl border-2 p-4 transition-all hover:shadow-lg",
                                selectedId === template.id
                                    ? "border-gold-500 bg-gold-50/50"
                                    : "border-transparent bg-slate-50 hover:border-gold-200"
                            )}
                            onClick={() => setSelectedId(template.id)}
                        >
                            {selectedId === template.id && (
                                <div className="absolute top-2 right-2 rounded-full bg-gold-500 p-1 text-white">
                                    <Check className="w-4 h-4" />
                                </div>
                            )}
                            <div className={cn("h-40 w-full rounded-lg mb-4 border shadow-sm", template.color)} />
                            <h3 className="font-semibold text-lg">{template.name}</h3>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between">
                    <Button variant="outline" onClick={onBack}>
                        Back
                    </Button>
                    <Button onClick={handleNext}>
                        Generate Resume
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
