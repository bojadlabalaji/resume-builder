import api from "@/lib/api";

export interface UserProfile {
    id: number;
    name: string;
    profile_data: any;
}

export const getProfiles = async (): Promise<UserProfile[]> => {
    const response = await api.get("/user-profile/");
    return response.data;
};

export const createProfile = async (file: File): Promise<UserProfile> => {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await api.post("/user-profile/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updateProfile = async (id: number, data: any): Promise<UserProfile> => {
    const response = await api.put(`/user-profile/${id}`, data);
    return response.data;
};
