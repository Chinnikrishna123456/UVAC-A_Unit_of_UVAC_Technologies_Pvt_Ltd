import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface User {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  role?: string;
  profile_image?: string | null;
}

const ProfileSettings = () => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [profileImageUpdated, setProfileImageUpdated] = useState(false);

  const { data: userData, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: ['/api/user'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/user');
      return response.json();
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues & { image?: File }) => {
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      if (data.image) {
        formData.append('profileImage', data.image);
      }
      
      const response = await apiRequest('PUT', '/api/user/profile', formData);
      const responseData = response as unknown as { profile_image: string | null };
      
      // Ensure we have a valid image URL
      if (responseData.profile_image) {
        // If it's a relative path, prepend the API base URL
        if (!responseData.profile_image.startsWith('http')) {
          responseData.profile_image = `${process.env.NEXT_PUBLIC_API_URL}${responseData.profile_image}`;
        }
        // Also add a timestamp to prevent caching issues
        responseData.profile_image += `?t=${Date.now()}`;
      }
      
      return responseData;
    },
    onSuccess: (data: { profile_image: string | null }) => {
      // Update the query data directly with the new image
      queryClient.setQueryData(['/api/user'], (old: any) => ({
        ...old,
        profile_image: data.profile_image
      }));
      
      // Also invalidate to ensure future requests get fresh data
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
      
      // Force a re-render of the header by updating a state
      setProfileImageUpdated(prev => !prev);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  useEffect(() => {
    if (userData) {
      setValue('firstName', userData.firstName);
      setValue('lastName', userData.lastName);
      setImagePreview(userData.profile_image || '/default-avatar.png');
    }
  }, [userData, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      setError(null);
      await updateProfileMutation.mutateAsync({ ...data, image });
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  });

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="h-40 w-40 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/default-avatar.png';
                  }}
                />
              ) : (
                <div className="h-40 w-40 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl">{userData?.firstName?.[0] || 'U'}</span>
                </div>
              )}
              <Button
                variant="outline"
                className="mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('image-upload')?.click();
                }}
              >
                Change Profile Picture
              </Button>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                {...register('firstName')}
                placeholder="Enter your first name"
                disabled={updateProfileMutation.isPending}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                {...register('lastName')}
                placeholder="Enter your last name"
                disabled={updateProfileMutation.isPending}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={userData?.email || ''}
                disabled
                placeholder="Your email"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-primary hover:bg-blue-700"
              disabled={updateProfileMutation.isPending || loading}
            >
              {updateProfileMutation.isPending || loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
