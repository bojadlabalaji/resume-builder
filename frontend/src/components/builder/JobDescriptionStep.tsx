import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Textarea } from "@/components/ui/Textarea"

interface JobDescriptionStepProps {
    onJobDescriptionChange: (jd: string) => void
    onNext: () => void
    onBack: () => void
}

export function JobDescriptionStep({ onJobDescriptionChange, onNext, onBack }: JobDescriptionStepProps) {
    const [jd, setJd] = useState("")

    const handleNext = () => {
        onJobDescriptionChange(jd)
        onNext()
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Target Job Description</CardTitle>
                <CardDescription>
                    Paste the job description you are applying for. We'll tailor your resume to match it.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Textarea
                    placeholder="Paste job description here..."
                    className="min-h-[300px]"
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                />
                <div className="flex justify-between">
                    <Button variant="outline" onClick={onBack}>
                        Back
                    </Button>
                    <Button onClick={handleNext} disabled={!jd.trim()}>
                        Next Step
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
