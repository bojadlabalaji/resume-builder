"use client";

import { useState } from "react";
import { UserProfile } from "@/services/userProfileService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Pencil, Mail, Phone, MapPin } from "lucide-react";

interface BasicInfoSectionProps {
    data: any;
    onSave: (newData: any) => void;
}

export function BasicInfoSection({ data, onSave }: BasicInfoSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(data || {});

    const handleSave = () => {
        onSave(formData);
        setIsEditing(false);
    };

    const getInitials = (name: string) => {
        return name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2) || "U";
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 relative">
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                onClick={() => {
                    setFormData(data || {});
                    setIsEditing(true);
                }}
            >
                <Pencil className="w-4 h-4" />
            </Button>

            <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-teal-700 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    {getInitials(data?.name || "")}
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data?.name || "Your Name"}</h2>

                    <div className="space-y-1 text-gray-600 dark:text-gray-300">
                        {data?.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>{data.email}</span>
                            </div>
                        )}
                        {data?.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>{data.phone}</span>
                            </div>
                        )}
                        {data?.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{data.location}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Basic Info">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
                        <Input
                            value={formData.name || ""}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                        <Input
                            value={formData.email || ""}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="e.g. john@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Phone</label>
                        <Input
                            value={formData.phone || ""}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="e.g. +1 234 567 890"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Location</label>
                        <Input
                            value={formData.location || ""}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. New York, USA"
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
