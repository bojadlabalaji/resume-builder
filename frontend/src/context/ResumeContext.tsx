'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData, GeneratedResume } from '@/types/resume';

interface ResumeContextType {
    resumeData: ResumeData | null;
    setResumeData: (data: ResumeData | null) => void;
    jobDescription: string;
    setJobDescription: (jd: string) => void;
    generatedResumeId: number | null;
    setGeneratedResumeId: (id: number | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    currentTemplateId: number;
    setCurrentTemplateId: (id: number) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [jobDescription, setJobDescription] = useState<string>('');
    const [generatedResumeId, setGeneratedResumeId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentTemplateId, setCurrentTemplateId] = useState<number>(1);

    return (
        <ResumeContext.Provider value={{
            resumeData,
            setResumeData,
            jobDescription,
            setJobDescription,
            generatedResumeId,
            setGeneratedResumeId,
            isLoading,
            setIsLoading,
            currentTemplateId,
            setCurrentTemplateId
        }}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
}
