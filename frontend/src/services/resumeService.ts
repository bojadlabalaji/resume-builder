import api from "@/lib/api";
import { GeneratedResume, RefineTextInput, RefineTextOutput } from "@/types/resume";

export const uploadProfile = async (file: File, profileName: string = "Default Profile") => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("profile_name", profileName);

    const response = await api.post("/user-profile/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const generateResume = async (
    file: File,
    jobDescription: string,
    templateId: number,
    atsFeedback?: string
): Promise<GeneratedResume> => {
    // 1. Upload the profile first
    const profile = await uploadProfile(file);

    // 2. Generate resume using the profile ID
    const response = await api.post<GeneratedResume>("/resume/generate-resume", null, {
        params: {
            profile_id: profile.id,
            job_description: jobDescription,
            template_id: templateId,
            ats_feedback: atsFeedback,
            generation_name: `Resume for ${new Date().toLocaleDateString()}`,
        },
    });

    return response.data;
};

export const refineText = async (data: RefineTextInput): Promise<RefineTextOutput> => {
    const response = await api.post<RefineTextOutput>("/resume/refine-text", data);
    return response.data;
};

export const downloadResume = async (resumeId: number, format: 'pdf' | 'docx') => {
    const response = await api.get(`/resume/download/${resumeId}`, {
        params: { format },
        responseType: 'blob',
    });

    // Create a link to download the file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `resume_${resumeId}.${format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export const getResumes = async (): Promise<GeneratedResume[]> => {
    const response = await api.get<GeneratedResume[]>("/resume/");
    return response.data;
};
