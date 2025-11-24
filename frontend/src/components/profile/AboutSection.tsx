"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { Pencil } from "lucide-react";

interface AboutSectionProps {
    data: string;
    onSave: (newData: string) => void;
}

export function AboutSection({ data, onSave }: AboutSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(data || "");

    const handleSave = () => {
        onSave(text);
        setIsEditing(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 relative">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">About</h2>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => {
                        setText(data || "");
                        setIsEditing(true);
                    }}
                >
                    <Pencil className="w-4 h-4" />
                </Button>
            </div>

            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {data || "Add a summary about yourself..."}
            </p>

            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit About">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Summary</label>
                        <Textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Write a short professional summary..."
                            className="min-h-[200px]"
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
