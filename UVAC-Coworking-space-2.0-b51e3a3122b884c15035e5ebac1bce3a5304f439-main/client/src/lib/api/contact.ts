import { useMutation } from '@tanstack/react-query';
import { getQueryFn, queryClient } from '@/lib/queryClient';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string | null;
  message: string;
  preferredDate: string | null;
  subscribe: boolean;
}

export function useSubmitContactForm() {
  return useMutation({
    mutationFn: async (formData: ContactFormData) => {
      console.log('Submitting contact form:', formData);
      
      const url = '/api/contact';
      
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Contact form submission failed:', {
            status: response.status,
            message: errorText
          });
          throw new Error(`Failed to submit form (Status: ${response.status}): ${errorText}`);
        }

        const data = await response.json();
        console.log('Contact form submission successful:', data);
        return data;
      } catch (error) {
        console.error('Network error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Contact form submission succeeded');
      queryClient.invalidateQueries({
        queryKey: ['/api/dashboard/inquiries']
      });
    }
  });
}
