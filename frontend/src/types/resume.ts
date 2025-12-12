export interface ResumeBasicInfo {
    full_name?: string;
    email?: string;
    phone?: string;
    linkedin_url?: string;
    portfolio_url?: string;
    location?: string;
    summary?: string;
}

export interface ResumeExperience {
    role: string;
    company: string;
    duration: string;
    description: string; // Often a bulleted list string or HTML
    location?: string;
}

export interface ResumeEducation {
    degree: string;
    university: string;
    year: string;
    gpa?: string;
}

export interface ResumeProject {
    name: string;
    description: string;
    technologies?: string;
    link?: string;
}

export interface ResumeSkill {
    category: string;
    skills: string[];
}

export interface ResumeData {
    basic_info: ResumeBasicInfo;
    experience?: ResumeExperience[];
    education?: ResumeEducation[];
    projects?: ResumeProject[];
    skills?: ResumeSkill[] | string[]; // Can be categorized or simple list
    achievements?: string[];
    certifications?: string[];
}

export interface RefineTextInput {
    original_text: string;
    instruction: string;
    context?: string;
    job_description?: string;
    resume_content?: string;
}

export interface RefineTextOutput {
    refined_text: string;
}

export interface GeneratedResume {
    id: number;
    name: string;
    job_description?: string;
    template_id?: number;
    tailored_resume_content: {
        resume: ResumeData;
        analysis: {
            verdict?: string;
            strength?: string;
            weakness?: string;
        };
    };
    created_at?: string;
}
