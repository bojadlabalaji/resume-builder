"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { Pencil, Trash2, Plus, Building2 } from "lucide-react";

interface Experience {
    title: string;
    company: string;
    location?: string;
    start_date: string;
    end_date?: string;
    current?: boolean;
    description: string;
}

interface ExperienceSectionProps {
    data: Experience[];
    onSave: (newData: Experience[]) => void;
}

export function ExperienceSection({ data, onSave }: ExperienceSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<Experience>({
        title: "",
        company: "",
        start_date: "",
        description: ""
    });

    const handleEdit = (index: number) => {
        setCurrentIndex(index);
        setFormData(data[index]);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setCurrentIndex(null);
        setFormData({
            title: "",
            company: "",
            start_date: "",
            description: ""
        });
        setIsEditing(true);
    };

    const handleDelete = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        onSave(newData);
    };

    const handleSave = () => {
        let newData;
        if (currentIndex !== null) {
            newData = [...data];
            newData[currentIndex] = formData;
        } else {
            newData = [...(data || []), formData];
        }
        onSave(newData);
        setIsEditing(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Experience</h2>
                <Button variant="ghost" size="icon" onClick={handleAdd}>
                    <Plus className="w-5 h-5" />
                </Button>
            </div>

            <div className="space-y-6">
                {(data || []).map((exp, index) => (
                    <div key={index} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-700 shrink-0">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-900">{exp.title}</h3>
                                    <div className="text-purple-700 font-medium">{exp.company}</div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {exp.start_date} - {exp.current ? "Present" : exp.end_date}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500" onClick={() => handleDelete(index)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600" onClick={() => handleEdit(index)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <p className="text-gray-600 mt-3 text-sm whitespace-pre-wrap">
                                {exp.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title={currentIndex !== null ? "Edit Experience" : "Add Experience"}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Job Title</label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Software Engineer"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <Input
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g. Acme Corp"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Start Date</label>
                            <Input
                                value={formData.start_date}
                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                placeholder="e.g. Jan 2020"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">End Date</label>
                            <Input
                                value={formData.end_date || ""}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                placeholder="e.g. Present"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe your responsibilities and achievements..."
                            className="min-h-[150px]"
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
