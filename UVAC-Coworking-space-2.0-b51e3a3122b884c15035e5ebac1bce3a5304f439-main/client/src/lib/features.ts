import { 
  MapPin, 
  Calendar, 
  Wifi, 
  Users, 
  Phone, 
  Shield 
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: MapPin,
    title: "Prime Locations",
    description: "Our workspaces are strategically located in business hubs with excellent transportation links and amenities.",
  },
  {
    icon: Calendar,
    title: "Flexible Terms",
    description: "From daily passes to annual agreements, our contracts adapt to your changing business needs.",
  },
  {
    icon: Wifi,
    title: "Technology Ready",
    description: "High-speed internet, smart conference rooms, and IT support ensure seamless operations.",
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Join our vibrant community of professionals for networking and collaboration opportunities.",
  },
  {
    icon: Phone,
    title: "Business Support",
    description: "Professional reception, mail handling, and administrative services to support your operations.",
  },
  {
    icon: Shield,
    title: "Secure Environment",
    description: "State-of-the-art security systems and protocols protect your business around the clock.",
  },
];
