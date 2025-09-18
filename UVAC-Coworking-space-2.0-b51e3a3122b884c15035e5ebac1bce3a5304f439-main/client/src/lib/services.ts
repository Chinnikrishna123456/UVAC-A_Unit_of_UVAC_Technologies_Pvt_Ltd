import { MoveRight } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  link: string;
}

export const services: Service[] = [
  {
    id: "office-space",
    title: "Office Space",
    description: "Professional, private office spaces tailored to your needs, available on flexible terms.",
    price: "From ₹5,000/month",
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    link: "/services/office-space",
  },
  {
    id: "coworking",
    title: "Coworking",
    description: "Collaborative workspace environments designed for networking and productivity.",
    price: "From ₹8,000/month",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    link: "/services/coworking",
  },
  {
    id: "virtual-offices",
    title: "Virtual Offices",
    description: "Establish a professional business presence without the physical office space.",
    price: "From ₹8,000/month",
    image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    link: "/services/virtual-offices",
  },
  {
    id: "meeting-rooms",
    title: "Meeting Rooms",
    description: "Professional meeting spaces available by the hour for presentations and client meetings.",
    price: "Free",
    image: "https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    link: "/services/meeting-rooms",
  },
  {
    id: "membership",
    title: "Membership",
    description: "Flexible workspace access with additional perks and global location options.",
    price: "From ₹5,000/month",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    link: "/services/membership",
  },
  {
    id: "business-address",
    title: "Business Address",
    description: "Use our prestigious address for your business correspondence and registration.",
    price: "From ₹5,000/month",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    link: "/services/business-address",
  },
  {
    id: "telephone-answering",
    title: "Telephone Answering",
    description: "Professional call handling services to ensure you never miss an important call.",
    price: "From ₹5,000/month",
    image: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    link: "/services/telephone-answering",
  },
  {
    id: "private-offices",
    title: "Private Offices",
    description: "Fully furnished private offices with all the amenities for teams of any size.",
    price: "From ₹5,000/month",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    link: "/services/private-offices",
  },
  {
    id: "hot-desking",
    title: "Hot-desking",
    description: "Flexible desk space available when you need it, with no long-term commitment.",
    price: "From ₹500/day",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    link: "/services/hot-desking",
  },
];
