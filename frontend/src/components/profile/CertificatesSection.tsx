"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Pencil, Trash2, Plus, Award } from "lucide-react";

interface Certificate {
    name: string;
    issuer: string;
    date: string;
    certificate_number?: string;
}

interface CertificatesSectionProps {
    data: Certificate[];
    onSave: (newData: Certificate[]) => void;
}

export function CertificatesSection({ data, onSave }: CertificatesSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<Certificate>({
        name: "",
        issuer: "",
        date: ""
    });

    const handleEdit = (index: number) => {
        setCurrentIndex(index);
        setFormData(data[index]);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setCurrentIndex(null);
        setFormData({
            name: "",
            issuer: "",
            date: ""
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Certificates</h2>
                <Button variant="ghost" size="icon" onClick={handleAdd}>
                    <Plus className="w-5 h-5" />
                </Button>
            </div>

            <div className="space-y-6">
                {(data || []).map((cert, index) => (
                    <div key={index} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-700 shrink-0">
                            <Award className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-900">{cert.name}</h3>
                                    <div className="text-purple-700 font-medium">{cert.issuer}</div>
                                    <div className="text-sm text-gray-500 mt-1">{cert.date}</div>
                                    {cert.certificate_number && (
                                        <div className="text-sm text-gray-500 mt-1">Certificate number: {cert.certificate_number}</div>
                                    )}
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

            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title={currentIndex !== null ? "Edit Certificate" : "Add Certificate"}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Certificate Name</label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. AWS Certified Solutions Architect"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Issuer</label>
                        <Input
                            value={formData.issuer}
                            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                            placeholder="e.g. Amazon Web Services"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Date</label>
                        <Input
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            placeholder="e.g. Sep 2023"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Certificate Number (Optional)</label>
                        <Input
                            value={formData.certificate_number || ""}
                            onChange={(e) => setFormData({ ...formData, certificate_number: e.target.value })}
                            placeholder="e.g. ABC-123-XYZ"
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
