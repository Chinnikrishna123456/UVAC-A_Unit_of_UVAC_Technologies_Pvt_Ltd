export interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    content: "Cowolocation has transformed how our team works. The flexible office space and professional environment have made a significant impact on our productivity and client relationships.",
    author: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    rating: 5,
    initials: "SJ",
  },
  {
    content: "The virtual office service has been perfect for our remote team. We maintain a professional business address while our team works from anywhere. The call answering service ensures we never miss important opportunities.",
    author: "Michael Donovan",
    role: "Founder",
    company: "Remote Solutions",
    rating: 5,
    initials: "MD",
  },
  {
    content: "As a startup, the coworking membership has been ideal. We've made valuable connections with other businesses, and the professional meeting rooms impress our clients and investors.",
    author: "Amelia Lee",
    role: "Co-founder",
    company: "Innovate AI",
    rating: 4.5,
    initials: "AL",
  },
  {
    content: "The private office suite exceeded our expectations. The staff is incredibly helpful, the facilities are top-notch, and the networking opportunities have been fantastic for our business.",
    author: "David Wilson",
    role: "Managing Director",
    company: "Wilson & Partners",
    rating: 5,
    initials: "DW",
  },
  {
    content: "Hot-desking at Cowolocation gives me the flexibility I need as a freelancer, but with the professionalism of a dedicated office. It's the perfect balance for my growing business.",
    author: "Emma Rodriguez",
    role: "Independent Consultant",
    company: "Design Forward",
    rating: 4.5,
    initials: "ER",
  },
];
