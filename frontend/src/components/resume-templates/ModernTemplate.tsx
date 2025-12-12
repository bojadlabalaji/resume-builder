'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';
import { EditableField } from './EditableField';
import { useResume } from '@/context/ResumeContext';

interface ModernTemplateProps {
    data: ResumeData;
    readOnly?: boolean;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, readOnly = false }) => {
    const { setResumeData } = useResume();

    const updateBasicInfo = (field: keyof typeof data.basic_info, val: string) => {
        if (readOnly) return;
        setResumeData({
            ...data,
            basic_info: {
                ...data.basic_info,
                [field]: val
            }
        });
    };

    // Helper to update specific experience item
    const updateExperience = (index: number, field: string, val: string) => {
        if (readOnly || !data.experience) return;
        const newExp = [...data.experience];
        newExp[index] = { ...newExp[index], [field]: val };
        setResumeData({ ...data, experience: newExp });
    };

    return (
        <div className="font-sans text-gray-800 max-w-[210mm] mx-auto min-h-[297mm] bg-white p-10 shadow-sm">
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-6 mb-8">
                <EditableField
                    value={data.basic_info.full_name || ''}
                    onSave={(v) => updateBasicInfo('full_name', v)}
                    tagName="h1"
                    className="text-4xl font-bold text-gray-900 uppercase tracking-wide mb-2"
                    placeholder="YOUR NAME"
                />

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                    {data.basic_info.email && (
                        <EditableField
                            value={data.basic_info.email}
                            onSave={(v) => updateBasicInfo('email', v)}
                            tagName="span"
                        />
                    )}
                    {data.basic_info.phone && (
                        <>
                            <span>•</span>
                            <EditableField
                                value={data.basic_info.phone}
                                onSave={(v) => updateBasicInfo('phone', v)}
                                tagName="span"
                            />
                        </>
                    )}
                    {data.basic_info.location && (
                        <>
                            <span>•</span>
                            <EditableField
                                value={data.basic_info.location}
                                onSave={(v) => updateBasicInfo('location', v)}
                                tagName="span"
                            />
                        </>
                    )}
                    {data.basic_info.linkedin_url && (
                        <>
                            <span>•</span>
                            <EditableField
                                value={data.basic_info.linkedin_url}
                                onSave={(v) => updateBasicInfo('linkedin_url', v)}
                                tagName="span"
                            />
                        </>
                    )}
                </div>
            </header>

            {/* Summary */}
            {data.basic_info.summary && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Professional Summary</h2>
                    <EditableField
                        value={data.basic_info.summary}
                        onSave={(v) => updateBasicInfo('summary', v)}
                        tagName="p"
                        multiline
                        className="text-gray-700 leading-relaxed"
                    />
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Experience</h2>
                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="group relative">
                                <div className="flex justify-between items-baseline mb-1">
                                    <EditableField
                                        value={exp.role}
                                        onSave={(v) => updateExperience(index, 'role', v)}
                                        tagName="h3"
                                        className="text-lg font-bold text-gray-800"
                                        placeholder="Job Title"
                                    />
                                    <EditableField
                                        value={exp.duration}
                                        onSave={(v) => updateExperience(index, 'duration', v)}
                                        tagName="span"
                                        className="text-sm text-gray-500 font-medium whitespace-nowrap ml-4"
                                        placeholder="Date Range"
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-2">
                                    <EditableField
                                        value={exp.company}
                                        onSave={(v) => updateExperience(index, 'company', v)}
                                        tagName="div"
                                        className="text-md font-semibold text-gray-700"
                                        placeholder="Company Name"
                                    />
                                    <EditableField
                                        value={exp.location || ''}
                                        onSave={(v) => updateExperience(index, 'location', v)}
                                        tagName="span"
                                        className="text-sm text-gray-400 italic"
                                        placeholder="Location"
                                    />
                                </div>

                                <EditableField
                                    value={exp.description}
                                    onSave={(v) => updateExperience(index, 'description', v)}
                                    tagName="div"
                                    multiline
                                    className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap pl-1"
                                    placeholder="Describe your responsibilities..."
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Education</h2>
                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-1">
                                    <h3 className="font-bold text-gray-800">{edu.university}</h3>
                                    <span className="text-sm text-gray-500">{edu.year}</span>
                                </div>
                                <div className="text-gray-700">{edu.degree}</div>
                                {edu.gpa && <div className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</div>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {/* 
                            Handling both string[] and ResumeSkill[]
                            For V1 simplicity, let's assume simple render for now or check type
                        */}
                        {data.skills.map((skill, index) => {
                            if (typeof skill === 'string') {
                                return (
                                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                        {skill}
                                    </span>
                                )
                            } else {
                                // ResumeSkill object { category, skills }
                                return (
                                    <div key={index} className="w-full mb-3">
                                        <span className="font-semibold text-gray-700 mr-2">{skill.category}:</span>
                                        <span className="text-gray-600">{skill.skills.join(', ')}</span>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </section>
            )}
        </div>
    );
};
