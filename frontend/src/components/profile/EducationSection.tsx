"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Pencil, Trash2, Plus, GraduationCap } from "lucide-react";

interface Education {
    degree: string;
    school: string;
    location?: string;
    start_date: string;
    end_date?: string;
}

interface EducationSectionProps {
    data: Education[];
    onSave: (newData: Education[]) => void;
}

export function EducationSection({ data, onSave }: EducationSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<Education>({
        degree: "",
        school: "",
        start_date: ""
    });

    const handleEdit = (index: number) => {
        setCurrentIndex(index);
        setFormData(data[index]);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setCurrentIndex(null);
        setFormData({
            degree: "",
            school: "",
            start_date: ""
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
                <h2 className="text-xl font-bold text-gray-900">Education</h2>
                <Button variant="ghost" size="icon" onClick={handleAdd}>
                    <Plus className="w-5 h-5" />
                </Button>
            </div>

            <div className="space-y-6">
                {(data || []).map((edu, index) => (
                    <div key={index} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-700 shrink-0">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                    <div className="text-purple-700 font-medium">{edu.school}</div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {edu.start_date} - {edu.end_date || "Present"}
                                    </div>
                                    {edu.location && <div className="text-sm text-gray-500">{edu.location}</div>}
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
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title={currentIndex !== null ? "Edit Education" : "Add Education"}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Degree</label>
                        <Input
                            value={formData.degree}
                            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                            placeholder="e.g. Bachelor of Science"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">School / University</label>
                        <Input
                            value={formData.school}
                            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                            placeholder="e.g. University of Technology"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input
                            value={formData.location || ""}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. New York, USA"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Start Date</label>
                            <Input
                                value={formData.start_date}
                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                placeholder="e.g. 2018"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">End Date</label>
                            <Input
                                value={formData.end_date || ""}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                placeholder="e.g. 2022"
                            />
                        </div>
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
