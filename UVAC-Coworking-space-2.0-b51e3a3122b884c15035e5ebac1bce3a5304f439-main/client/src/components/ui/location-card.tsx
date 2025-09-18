import { Link } from "wouter";

interface LocationCardProps {
  name: string;
  address: string;
  image: string;
  link: string;
}

const LocationCard = ({ name, address, image, link }: LocationCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <img
        src={image}
        alt={`${name} office location`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-neutral-800">{name}</h3>
        <p className="mt-2 text-neutral-600">{address}</p>
        <div className="mt-4">
          <Link
            href={link}
            className="text-primary font-medium hover:text-blue-700"
          >
            View location details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
