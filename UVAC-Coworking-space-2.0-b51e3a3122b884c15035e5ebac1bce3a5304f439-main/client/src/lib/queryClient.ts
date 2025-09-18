import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    console.error('API request failed:', {
      status: res.status,
      statusText: res.statusText,
      response: text
    });
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | FormData | undefined,
  options?: { headers?: Record<string, string> }
): Promise<any> {
  // Ensure all API requests include the /api prefix
  const API_PATH = url.startsWith('/api') ? url : `/api${url.startsWith('/') ? url : '/' + url}`;
  
  // Configure API base URL based on environment
  const API_BASE_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5173' // Use Vite proxy
    : process.env.VITE_API_URL || 'http://localhost:3001'; // Production fallback

  let body: string | FormData | undefined;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers || {})
  };

  // Handle GET/HEAD requests without body
  if (method === 'GET' || method === 'HEAD') {
    body = undefined;
    delete headers['Content-Type'];
  } else if (data instanceof FormData) {
    body = data;
    delete headers['Content-Type']; // FormData handles its own content type
  } else if (data) {
    body = JSON.stringify(data);
  }

  try {
    console.log('Making request to:', API_PATH);
    const response = await fetch(`${API_BASE_URL}${API_PATH}`, {
      method,
      headers,
      body,
    });

    console.log('Response received:', response);
    
    // Read the response body once
    const text = await response.text();
    console.log('Response text:', text);

    if (!response.ok) {
      try {
        // Try to parse as JSON
        const errorData = JSON.parse(text);
        console.error('API Response Error:', errorData);
        throw new Error(`${response.status}: ${errorData.error || errorData.details || response.statusText}`);
      } catch {
        // If JSON parsing fails, use the raw text
        console.error('API Response Error:', text);
        throw new Error(`${response.status}: ${text}`);
      }
    }

    // For successful responses, try to parse as JSON if it looks like JSON
    if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
      try {
        const data = JSON.parse(text);
        console.log('API Response Data:', data);
        return data;
      } catch {
        console.error('Error parsing JSON response:', text);
      }
    }

    // For non-JSON responses, return the text
    console.log('API Response Data:', text);
    return text;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') ? {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        } : {})
      }
    });

    if (res.status === 401) {
      if (unauthorizedBehavior === "returnNull") {
        return null;
      }
      throw new Error("Unauthorized");
    }

    const text = await res.text();
    
    if (!res.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(`${res.status}: ${errorData.error || errorData.details || res.statusText}`);
      } catch {
        throw new Error(`${res.status}: ${text}`);
      }
    }

    if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
      try {
        return JSON.parse(text);
      } catch {
        console.error('Error parsing JSON response:', text);
      }
    }

    return text;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Refetch only when the window regains focus
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      refetchInterval: false,
      retry: 1,
      // Don't refetch on reconnect
      refetchOnReconnect: false,
      // Cache auth user data for longer
      gcTime: 30 * 60 * 1000, // 30 minutes
    },
  },
});
