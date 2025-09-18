import axios, { 
    AxiosError, 
    AxiosRequestConfig, 
    AxiosResponse, 
    InternalAxiosRequestConfig 
} from 'axios';
import { queryClient } from './queryClient';

// Define API base URL - use empty string to use relative URLs with Vite proxy
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Reduced timeout to 10 seconds
    maxRedirects: 5
});

// Add request interceptor to ensure all requests use /api prefix
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // If the URL doesn't start with /api, add it
        if (!config.url?.startsWith('/api')) {
            config.url = '/api' + (config.url || '');
        }
        
        console.log(`Making request to: ${config.url}`);
        return config;
    },
    (error: AxiosError) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for token errors
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('Response received:', response.data);
        return response;
    },
    (error: AxiosError) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Token might be invalid or expired
            localStorage.removeItem('token');
            // Invalidate auth queries
            queryClient.invalidateQueries({ queryKey: ['user'] });
            // Redirect to login page
            window.location.href = '/login';
        }
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);

// Define common API response types
export interface ApiResponse<T> {
    data: T | null;
    success: boolean;
    message?: string;
}

// Define common API error type
export interface ApiError {
    message: string;
    status: number;
    details?: any;
}

// Create generic request function
export const apiRequest = {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        try {
            const response = await apiClient.get<T>(url, config);
            return {
                data: response.data,
                success: true
            };
        } catch (error) {
            console.error('GET request error:', error);
            return {
                data: null,
                success: false,
                message: error instanceof AxiosError ? error.message : 'Request failed'
            };
        }
    },

    post: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
        try {
            const response = await apiClient.post<T>(url, data, config);
            return response.data;
        } catch (error) {
            console.error('POST request error:', error);
            throw error;
        }
    },

    put: async <T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        try {
            const response = await apiClient.put<T>(url, data, config);
            return {
                data: response.data,
                success: true
            };
        } catch (error) {
            console.error('PUT request error:', error);
            return {
                data: null,
                success: false,
                message: error instanceof AxiosError ? error.message : 'Request failed'
            };
        }
    },

    delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        try {
            const response = await apiClient.delete<T>(url, config);
            return {
                data: response.data,
                success: true
            };
        } catch (error) {
            console.error('DELETE request error:', error);
            return {
                data: null,
                success: false,
                message: error instanceof AxiosError ? error.message : 'Request failed'
            };
        }
    },

    // Helper function to handle errors
    handleError: (error: AxiosError): ApiError => {
        const errorData = error.response?.data as { message?: string } | undefined;
        return {
            message: errorData?.message || error.message,
            status: error.response?.status || 500,
            details: error.response?.data,
        };
    },
};

// Add a function to check auth status
export const checkAuthStatus = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        
        // Try to get user info to validate token
        const response = await apiRequest.get('/auth/user');
        return !!response.data;
    } catch (error) {
        localStorage.removeItem('token');
        return false;
    }
};

export default apiRequest;