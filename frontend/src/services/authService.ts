import api from "@/lib/api";

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const response = await api.post("/auth/login", params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
    }

    return response.data;
};

export const register = async (email: string, password: string): Promise<AuthResponse> => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    const response = await api.post("/auth/register", params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
    }

    return response.data;
};

export const logout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
};

export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem("access_token");
};
