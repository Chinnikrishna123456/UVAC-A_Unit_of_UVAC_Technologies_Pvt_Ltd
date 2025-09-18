import { Star, StarHalf } from "lucide-react";
import cn from "classnames";

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  initials: string;
  className?: string;
}

const TestimonialCard = ({
  content,
  author,
  role,
  company,
  rating,
  initials,
  className,
}: TestimonialCardProps) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-[#FF6B35] text-[#FF6B35]" size={16} />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-[#FF6B35] text-[#FF6B35]" size={16} />);
    }

    return stars;
  };

  return (
    <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4">
      <div className={cn("bg-[#F0F6FF] rounded-lg p-6 h-full", className)}>
        <div className="flex items-center mb-4">
          <div className="flex text-[#FF6B35]">
            {renderStars()}
          </div>
        </div>
        <p className="text-neutral-700 italic mb-6">{content}</p>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
            {initials}
          </div>
          <div className="ml-3">
            <h4 className="font-semibold text-neutral-800">{author}</h4>
            <p className="text-sm text-neutral-600">
              {role}, {company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
