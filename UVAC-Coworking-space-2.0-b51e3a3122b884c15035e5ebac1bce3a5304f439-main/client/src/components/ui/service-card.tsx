import { Link } from "wouter";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  link: string;
  className?: string;
}

const ServiceCard = ({
  id,
  title,
  description,
  price,
  image,
  link,
  className,
}: ServiceCardProps) => {
  return (
    <div
      id={id}
      className={`service-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1 ${className}`}
    >
      <img
        src={image}
        alt={`${title} workspace`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-neutral-800">{title}</h3>
        <p className="mt-2 text-neutral-600">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-primary font-semibold">{price}</span>
          <Link
            href={link}
            className="text-[#FF6B35] font-medium hover:text-[#E55A24]"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
