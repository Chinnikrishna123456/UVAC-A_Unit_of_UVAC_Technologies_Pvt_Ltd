import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ icon: Icon, title, description, className }: FeatureCardProps) => {
  return (
    <div className={[className, "bg-white rounded-lg p-6 shadow-md"].filter(Boolean).join(" ")}>
      <div className="w-12 h-12 bg-[#F0F6FF] rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-2xl text-primary" size={24} />
      </div>
      <h3 className="text-xl font-semibold text-neutral-800">{title}</h3>
      <p className="mt-2 text-neutral-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
