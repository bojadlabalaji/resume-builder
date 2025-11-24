import api from "@/lib/api";

export interface GenerateResumeResponse {
    id: number;
    name: string;
    // Add other fields as needed based on API contract
}

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
): Promise<GenerateResumeResponse> => {
    // 1. Upload the profile first
    const profile = await uploadProfile(file);

    // 2. Generate resume using the profile ID
    const response = await api.post("/resume/generate-resume", null, {
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
