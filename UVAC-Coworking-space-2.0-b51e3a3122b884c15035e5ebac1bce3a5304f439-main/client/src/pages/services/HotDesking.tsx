import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PricingCard from "@/components/ui/pricing-card";
import { useState } from "react";
import {  Coffee, GlassWater, Wifi, Car, Microwave,Store } from "lucide-react";

const HotDesking = () => {
  const seats = [
    { id: 1, number: "HS01", status: "AVAILABLE", price: 500 },
    { id: 2, number: "HS02", status: "AVAILABLE", price: 500 },
    { id: 3, number: "HS03", status: "AVAILABLE", price: 500 },
    { id: 4, number: "HS04", status: "AVAILABLE", price: 500 },
    { id: 5, number: "HS05", status: "AVAILABLE", price: 500 },
    { id: 6, number: "HS06", status: "AVAILABLE", price: 500 },
    { id: 7, number: "HS07", status: "AVAILABLE", price: 500 },
    { id: 8, number: "HS08", status: "AVAILABLE", price: 500 },
    { id: 9, number: "HS09", status: "AVAILABLE", price: 500 },
    { id: 10, number: "HS10", status: "AVAILABLE", price: 500 },
    { id: 11, number: "HS11", status: "AVAILABLE", price: 500 },
    { id: 12, number: "HS12", status: "AVAILABLE", price: 500 },
  ];

  const [selectedCard, setSelectedCard] = useState<string>("");

  const handleCardClick = (type: string) => {
    setSelectedCard(type);
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[400px]" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')" }}
      >
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white leading-tight">Hot-Desking</h1>
            <p className="mt-4 text-xl text-white opacity-90">
              Flexible desk space available when you need it, with no long-term commitment.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-neutral-800">Flexible Hot-Desking Solutions</h2>
              <p className="mt-4 text-lg text-neutral-700">
                Access our premium workspace on a flexible basis. Perfect for freelancers, remote workers, and businesses looking for occasional workspace.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Flexible Access</h3>
                    <p className="text-neutral-600">Choose your days and hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Professional Amenities</h3>
                    <p className="text-neutral-600">High-speed internet, power outlets, and ergonomic furniture</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">24/7 Access</h3>
                    <p className="text-neutral-600">Work whenever you need with round-the-clock access</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Community Benefits</h3>
                    <p className="text-neutral-600">Access to meeting rooms and networking events</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  asChild 
                  className="bg-primary hover:bg-blue-700 text-white px-6 py-3"
                >
                  <Link href="/contact">Book Now</Link>
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Modern hot-desking workspace" 
                className="rounded-lg shadow-lg w-full h-auto transition-all duration-300 hover:scale-[1.02]"
              />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <img 
                  src="https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=400" 
                  alt="Collaborative hot-desking area" 
                  className="rounded-lg shadow-md w-full h-auto transition-all duration-300 hover:scale-[1.02]"
                />
                
                <img 
                  src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=400" 
                  alt="Office desk setup" 
                  className="rounded-lg shadow-md w-full h-auto transition-all duration-300 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
          
          {/* Pricing Plans */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-neutral-800 text-center mb-8">Hot-Desking Pricing Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-neutral-200">
                    <h4 className="text-xl font-semibold text-neutral-800">Daily Pass</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹500</span>
                      <span className="ml-1 text-neutral-600">/day</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Single day access</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>8-hour access</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Any available desk</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>High-speed Wi-Fi</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Free Coffee & Drinks</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Refrigerator Access</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>AC & Microwave</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-6">
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 transition-all duration-300 hover:scale-[1.02]"
                      onClick={() => handleCardClick("daily")}
                    >
                      <Link href="/contact">Book Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-neutral-200">
                    <h4 className="text-xl font-semibold text-neutral-800">Special Offer</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹5,000</span>
                      <span className="ml-1 text-neutral-600">/30 days</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Limited time offer</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>30-day access</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Any available desk</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>High-speed Wi-Fi</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Free Coffee & Drinks</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Refrigerator Access</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>AC & Microwave</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Priority booking</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>2 meeting room hours</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-6">
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Link href="/contact">Book Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Flexible Day Packages */}
            <div className="mt-8 text-center text-neutral-700">
              <h3 className="text-xl font-semibold mb-4">Flexible Day Packages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { days: 2, price: 1000, description: "Best value for short-term use" },
                  { days: 3, price: 1400, description: "Perfect for weekend work" },
                  { days: 4, price: 1800, description: "Great for project sprints" },
                  { days: 5, price: 2200, description: "Weekly work package" },
                  { days: 6, price: 2600, description: "Extended work package" },
                  { days: 7, price: 3000, description: "Full week access" }
                ].map((pkg) => (
                  <div 
                    key={pkg.days} 
                    className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <h4 className="text-lg font-semibold mb-2">{pkg.days} Days</h4>
                    <p className="text-2xl font-bold text-primary">₹{pkg.price}</p>
                    <p className="text-neutral-600">{pkg.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Available Seats */}
          <section className="py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-neutral-800 mb-8 text-center">Available Seats</h2>
              <div className="grid grid-cols-3 gap-4">
                {seats.map((seat) => (
                  <div key={seat.id} className="bg-white rounded-lg p-4 shadow-md">
                    <div className="relative h-48 mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                        alt="Professional Hot Desk Workspace"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
                        <span className="text-primary font-semibold">{seat.number}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-neutral-800">Hot Desk</h3>
                      <span className="text-lg font-semibold text-primary">₹{seat.price}</span>
                    </div>
                    <p className="text-neutral-600 mb-4">Daily Hot Desk</p>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-neutral-700 mb-2">Status: {seat.status}</p>
                    </div>
                    <div className="mt-4">
                      <Button 
                        asChild 
                        className={`w-full px-4 py-2 ${
                          seat.status === 'AVAILABLE' 
                            ? 'bg-primary hover:bg-blue-700 text-white'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                        disabled={seat.status !== 'AVAILABLE'}
                      >
                        <Link href="/contact">Book Now</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-neutral-800 mb-8 text-center">Additional Benefits</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-3 mb-3 inline-block">
                    <Coffee className="text-blue-600 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">Free Coffee</h3>
                  <p className="text-neutral-600">Complimentary coffee all day</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full p-3 mb-3 inline-block">
                    <GlassWater className="text-green-600 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">Free Cool Drinks</h3>
                  <p className="text-neutral-600">Refreshments available</p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-100 rounded-full p-3 mb-3 inline-block">
                    <Wifi className="text-yellow-600 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">High-Speed WiFi</h3>
                  <p className="text-neutral-600">Ultra-fast internet access</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full p-3 mb-3 inline-block">
                    <Microwave className="text-purple-600 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">AC & Microwave</h3>
                  <p className="text-neutral-600">Comfortable working environment</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <div className="mt-20 bg-primary text-white p-12 rounded-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold">Ready to book your hot desk?</h2>
                <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
                  Flexible daily, weekly, or monthly options available. Book your preferred seat today!
                </p>
                <div className="mt-8">
                  <Button 
                    asChild 
                    className="bg-white text-primary hover:bg-neutral-100 px-6 py-3"
                  >
                    <Link href="/contact">Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotDesking;
