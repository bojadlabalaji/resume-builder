"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X, Plus } from "lucide-react";

// Match backend schema exactly
interface Skill {
    category: string;
    skills: string[];
}

interface SkillsSectionProps {
    data: Skill[] | undefined | null;
    onSave: (newData: Skill[]) => void;
}

export function SkillsSection({ data, onSave }: SkillsSectionProps) {
    const skills = Array.isArray(data) ? data : [];

    const [isAdding, setIsAdding] = useState(false);
    const [addingToCategory, setAddingToCategory] = useState<string | null>(null);
    const [newSkill, setNewSkill] = useState("");
    const [newCategory, setNewCategory] = useState("");

    const handleRemoveSkill = (category: string, skillToRemove: string) => {
        const updated = skills.map(group => {
            if (group.category === category) {
                return {
                    ...group,
                    skills: group.skills.filter(s => s !== skillToRemove)
                };
            }
            return group;
        }).filter(group => group.skills.length > 0);
        onSave(updated);
    };

    const handleAddSkillToCategory = (category: string) => {
        if (!newSkill.trim()) return;

        const updated = skills.map(group => {
            if (group.category === category) {
                return {
                    ...group,
                    skills: [...group.skills, newSkill.trim()]
                };
            }
            return group;
        });
        onSave(updated);
        setNewSkill("");
        setAddingToCategory(null);
    };

    const handleAddCategory = () => {
        if (!newCategory.trim() || !newSkill.trim()) return;

        const updated = [
            ...skills,
            {
                category: newCategory.trim(),
                skills: [newSkill.trim()]
            }
        ];
        onSave(updated);
        setNewCategory("");
        setNewSkill("");
        setIsAdding(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>

            <div className="space-y-4">
                {skills.map((skillGroup, groupIndex) => (
                    <div key={groupIndex}>
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">
                            {skillGroup.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skillGroup.skills.map((skill, skillIndex) => (
                                <div
                                    key={skillIndex}
                                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md border border-gray-200 text-sm"
                                >
                                    <span>{skill}</span>
                                    <button
                                        onClick={() => handleRemoveSkill(skillGroup.category, skill)}
                                        className="text-gray-400 hover:text-red-500 focus:outline-none"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}

                            {addingToCategory === skillGroup.category ? (
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        className="h-8 w-32 text-sm"
                                        placeholder="New skill"
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleAddSkillToCategory(skillGroup.category);
                                            if (e.key === "Escape") {
                                                setAddingToCategory(null);
                                                setNewSkill("");
                                            }
                                        }}
                                    />
                                    <Button size="sm" onClick={() => handleAddSkillToCategory(skillGroup.category)} className="h-8 px-2">
                                        Add
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                            setAddingToCategory(null);
                                            setNewSkill("");
                                        }}
                                        className="h-8 px-2"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setAddingToCategory(skillGroup.category)}
                                    className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-200 text-gray-500 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {isAdding ? (
                    <div className="space-y-2 p-4 bg-gray-50 rounded-md border border-gray-200">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <Input
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="h-8 text-sm"
                                placeholder="e.g., Frontend, Backend, Cloud"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Skill</label>
                            <Input
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                className="h-8 text-sm"
                                placeholder="e.g., React, Python, AWS"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleAddCategory();
                                    if (e.key === "Escape") setIsAdding(false);
                                }}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleAddCategory} className="h-8">
                                Add Category
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)} className="h-8">
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-200 text-gray-600 text-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Category
                    </button>
                )}
            </div>
        </div>
    );
}
