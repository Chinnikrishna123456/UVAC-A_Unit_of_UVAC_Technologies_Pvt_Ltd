import { Link } from "wouter";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  link: string;
  className?: string;
  onClick?: () => void;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  featured = false,
  link,
  className,
  onClick,
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden cursor-pointer",
        featured && "shadow-xl transform scale-105",
        className
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "p-6 border-b border-neutral-200",
          featured && "bg-primary text-white border-blue-600"
        )}
      >
        <h4 className="text-xl font-semibold">{title}</h4>
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          <span className={cn("ml-1", featured ? "opacity-90" : "text-neutral-600")}>/month</span>
        </div>
        <p className={cn("mt-2", featured ? "opacity-90" : "text-neutral-600")}>{description}</p>
      </div>
      <div className="p-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="text-[#FF6B35] mr-2" size={16} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Link
            href={link}
            className={cn(
              "block w-full text-center px-4 py-2 rounded-md font-medium transition duration-150",
              featured
                ? "border border-transparent bg-[#FF6B35] text-white hover:bg-[#E55A24]"
                : "border border-primary text-primary hover:bg-primary hover:text-white"
            )}
          >
            Select Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
