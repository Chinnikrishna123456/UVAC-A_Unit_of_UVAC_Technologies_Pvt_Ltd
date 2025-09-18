import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/apiRequest';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Inbox, Users, Phone, FileText, Calendar, Building2, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserType } from '@/types';
import { AxiosError } from 'axios';

type InquiryType = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  subscribe: boolean;
  createdAt: string;
};

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  role: string;
}

interface InquiriesResponse {
  success: boolean;
  data: InquiryType[];
}

interface DashboardStats {
  totalInquiries: number;
  recentInquiries: InquiryType[];
  serviceStats: Record<string, number>;
}

const Dashboard = () => {
  const [, setLocation] = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const queryClient = useQueryClient();
  
  // Memoize query options to prevent unnecessary refetches
  const queryOptions = useMemo(() => ({
    queryKey: ['/api/dashboard/inquiries'],
    queryFn: async (): Promise<InquiriesResponse> => {
      try {
        const response = await apiRequest.get<{ success: boolean; data: InquiryType[] }>('/dashboard/inquiries');
        if (!response.data || !response.data.success) {
          throw new Error('Failed to fetch inquiries');
        }
        return { success: true, data: response.data.data };
      } catch (error: any) {
        console.error('Error fetching inquiries:', error);
        if (error?.response?.status === 401) {
          // If unauthorized, redirect to login
          setLocation('/login');
        }
        throw error;
      }
    },
    enabled: !!user && !authLoading && user?.role === 'admin',
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    retryDelay: 1000,
  }), [user, authLoading, setLocation]);

  // Fetch dashboard data
  const { 
    data: inquiriesData, 
    isLoading: isLoadingInquiries,
    error: inquiriesError 
  } = useQuery({
    ...queryOptions,
    refetchOnWindowFocus: false // Prevent refetching when window regains focus
  });
  
  // Process inquiries data
  const inquiries = useMemo<InquiryType[]>(() => {
    if (!inquiriesData?.success || !inquiriesData?.data) {
      return [];
    }
    return Array.isArray(inquiriesData.data) ? inquiriesData.data : [];
  }, [inquiriesData]);

  // Calculate stats
  const stats = useMemo<DashboardStats>(() => {
    if (!inquiriesData?.success) {
      return { totalInquiries: 0, recentInquiries: [], serviceStats: {} };
    }
    
    const total = inquiries.length;
    const recent = inquiries
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    
    const serviceStats = inquiries.reduce<Record<string, number>>((acc, inquiry) => {
      if (inquiry.service) {
        acc[inquiry.service] = (acc[inquiry.service] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      totalInquiries: total,
      recentInquiries: recent,
      serviceStats
    };
  }, [inquiries]);

  // Fetch all users (admin only)
  const { 
    data: users = [], 
    isLoading: isLoadingUsers, 
    error: usersError 
  } = useQuery<User[]>({
    queryKey: ['/api/users'],
    queryFn: async () => {
      const response = await apiRequest.get<User[]>('/users');
      return response.data || []; // Return empty array if null
    },
    enabled: user?.role === 'admin' && !!user && !authLoading,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Check if user is admin
  const isAdmin = useMemo(() => user?.role === 'admin', [user]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      setLocation('/login');
    }
  }, [authLoading, user, setLocation]);

  if (authLoading) {
    return <div className="container mx-auto px-4 py-12 flex justify-center">Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect to login
  }

  if (inquiriesError) {
    console.error('Dashboard error details:', inquiriesError);
    return (
      <div className="p-4 space-y-4">
        <div className="text-red-600 p-4 bg-red-50 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Error loading dashboard data</h3>
          <p className="mb-4">
            {inquiriesError.message || 'Please try again later.'}
          </p>
          <div className="text-sm text-red-700 bg-red-100 p-3 rounded">
            <p>Debug info:</p>
            <pre className="whitespace-pre-wrap mt-2 text-xs">
              {JSON.stringify(
                {
                  status: inquiriesError instanceof AxiosError ? inquiriesError.response?.status : undefined,
                  data: inquiriesError instanceof AxiosError ? inquiriesError.response?.data : undefined,
                  message: inquiriesError.message,
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
        <Button 
          onClick={() => queryClient.refetchQueries({ queryKey: ['/api/dashboard/inquiries'] })}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (isLoadingInquiries) {
    return <div className="p-4">Loading dashboard data...</div>;
  }

  const renderInquiries = () => {
    if (!inquiries || inquiries.length === 0) {
      return <div>No inquiries found.</div>;
    }

    return (
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div 
            key={`inquiry-${inquiry.id}`} // Ensure unique key
            className="border p-4 rounded-lg"
          >
            <div className="flex justify-between">
              <h3 className="font-medium">{inquiry.name}</h3>
              <span className="text-sm text-gray-500">
                {new Date(inquiry.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{inquiry.message}</p>
            {inquiry.service && (
              <Badge variant="outline" className="mt-2">
                {inquiry.service}
              </Badge>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* User Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <p className="text-gray-900">{user.firstName} {user.lastName}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900">{user.email || 'Not available'}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Company</label>
              <p className="text-gray-900">{user.company || 'Not available'}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Role</label>
              <p className="text-gray-900">{user.role || 'User'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing Tabs Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user ? 
                `${user.firstName} ${user.lastName}` : 'User'}
              {isAdmin && <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">Admin</span>}
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {/* Only show Inquiries tab for admins */}
            {isAdmin && (
              <>
                <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {isAdmin && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
                    <Inbox className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalInquiries}</div>
                    <p className="text-xs text-muted-foreground">
                      From contact form submissions
                    </p>
                  </CardContent>
                </Card>
              )}
              
              {isAdmin && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {isLoadingUsers ? '...' : users.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Active accounts on platform
                    </p>
                  </CardContent>
                </Card>
              )}
              
              {isAdmin && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Most Popular Service</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold capitalize">
                      {Object.entries(stats.serviceStats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Based on inquiry submissions
                    </p>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Current Date</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Date().toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Inquiries - Only visible to admins */}
            {isAdmin && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                  <CardDescription>
                    The latest inquiries from potential customers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingInquiries ? (
                    <div className="text-center py-4">Loading recent inquiries...</div>
                  ) : stats.recentInquiries.length > 0 ? (
                    renderInquiries()
                  ) : (
                    <div className="text-center py-4">No recent inquiries found</div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* Regular user welcome card */}
            {!isAdmin && (
              <Card>
                <CardHeader>
                  <CardTitle>Welcome to Your Dashboard</CardTitle>
                  <CardDescription>
                    Manage your Cowolocation account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>Welcome to your personal dashboard. From here, you can:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>View and update your account information</li>
                      <li>Check your workspace services</li>
                      <li>Get customer support</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-4">
                      Need help? Contact our support team for assistance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Inquiries Tab - Only visible to admins */}
          {isAdmin && (
            <TabsContent value="inquiries" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>All Inquiries</CardTitle>
                  <CardDescription>
                    Complete list of customer inquiries submitted through the contact form
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingInquiries ? (
                    <div className="text-center py-4">Loading inquiries...</div>
                  ) : inquiries.length > 0 ? (
                    renderInquiries()
                  ) : (
                    <div className="text-center py-4">No inquiries found</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Users Tab */}
          {isAdmin && (
            <TabsContent value="users" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage all registered users</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingUsers ? (
                    <div className="text-center py-4">Loading users...</div>
                  ) : usersError ? (
                    <div className="text-center py-4 text-red-500">
                      Error loading users. Please try again later.
                    </div>
                  ) : users.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {users.map((user) => (
                            <tr key={`user-${user.id}`} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.company || '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.role === 'admin' 
                                    ? 'bg-purple-100 text-purple-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {user.role}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-4">No users found</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;