export interface UserType {
  id: number | string;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  role?: string;
  profile_image?: string;
}

export interface InquiryType {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  subscribe: boolean;
}

export interface DashboardStats {
  totalInquiries: number;
  totalUsers: number;
  recentInquiries: InquiryType[];
  serviceStats: Record<string, number>;
}
