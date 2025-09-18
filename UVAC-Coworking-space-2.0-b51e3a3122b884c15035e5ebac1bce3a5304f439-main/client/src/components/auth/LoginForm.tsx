import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest, ApiResponse } from "@/lib/apiRequest";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { useAuth } from "@/context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";

const formSchema = z.object({
  email: z.string().min(3, { message: "Email field must be at least 3 characters" })
    .email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

interface LoginApiResponse {
  success: boolean;
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
    };
  };
  error?: string;
  details?: string;
}

const LoginForm = () => {
  const [location, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { setUser, login } = useAuth();
  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // First check if server is responding
      try {
        console.log('Testing server connection...');
        const testResponse = await apiRequest.get<LoginResponse>('/auth/test');
        console.log('Server test response:', testResponse.data);
      } catch (testError) {
        console.error('Server test failed:', testError);
        if (testError instanceof Error) {
          throw new Error('Could not connect to server. Please try again later.');
        }
        throw testError;
      }

      const loginPayload = {
        login: data.email.trim(),
        password: data.password.trim()
      };

      // Log the exact payload being sent
      console.log('Login payload:', {
        login: loginPayload.login,
        passwordLength: loginPayload.password.length,
        hasSpaces: loginPayload.password.includes(' ')
      });

      // Log the payload for debugging
      console.log('Submitting login:', loginPayload);

      const response = await apiRequest.post<LoginApiResponse, typeof loginPayload>(
        '/auth/login',
        loginPayload
      );

      // Log the full response for debugging
      console.log('Login response:', response);

      if (response && response.success && response.data) {
        // Store token and update auth state
        localStorage.setItem('token', response.data.token);
        
        // Update auth state - don't call login() again as we've already logged in
        setUser(response.data.user);
        setLocation('/dashboard');
      } else if (response && response.error) {
        // Handle specific error cases
        setError(response.error);
        toast({
          title: "Login Failed",
          description: response.error,
          variant: "destructive"
        });
      } else if (response && response.error === 'User not found') {
        setError('User not found. Please check your email or register for an account.');
        toast({
          title: "Login Failed",
          description: "User not found. Please check your email or register for an account.",
          variant: "destructive"
        });
      } else {
        // Handle unexpected response
        const errorMessage = response.error || 'Login failed. Please check your credentials.';
        setError(errorMessage);
        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        errorMessage = error.response?.data?.message || error.message;
        
        // More specific error messages
        if (error.response?.status === 401) {
          errorMessage = 'Invalid username or password. Please try again.';
        } else if (error.response?.status === 404) {
          errorMessage = 'User not found. Please check your username or register for an account.';
        } else if (!error.response) {
          errorMessage = 'Could not connect to the server. Please check your internet connection.';
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      toast({
        title: "Login Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm mb-2">
              {error}
            </div>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Remember me</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-600">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:text-blue-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
