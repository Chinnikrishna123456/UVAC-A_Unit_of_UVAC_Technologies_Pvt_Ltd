import React, { useState, useEffect } from 'react';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, Coffee, GlassWater, Wifi, Car } from "lucide-react";

interface Seat {
  id: number;
  seatNumber: string;
  type: 'DEDICATED' | 'HOT' | 'MEETING';
  price: number;
  status: string;
  bookedDates?: string[];
}

const DedicatedDesk = () => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initialize seats data
    const initialSeats: Seat[] = [
      ...Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        seatNumber: `DS${i + 1}`,
        type: "DEDICATED" as const,
        price: 5000,
        status: 'AVAILABLE',
        bookedDates: []
      }))
    ];
    setSeats(initialSeats);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[400px]" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')" }}
      >
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white leading-tight">Dedicated Desk</h1>
            <p className="mt-4 text-xl text-white opacity-90">
              Your own private workspace with all the amenities you need to work efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-neutral-800">Private Workspace Solutions</h2>
              <p className="mt-4 text-lg text-neutral-700">
                Secure your own dedicated desk in our premium office environment. Perfect for individuals and small teams who need their own private workspace with all the amenities.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Private Workspace</h3>
                    <p className="text-neutral-600">Your own dedicated desk with privacy and comfort</p>
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
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Modern dedicated desk workspace" 
                className="rounded-lg shadow-lg w-full h-auto transition-all duration-300 hover:scale-[1.02]"
              />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <img 
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400" 
                  alt="Professional workspace" 
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
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-800 mb-8 text-center">Pricing</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-neutral-200">
                  <h4 className="text-xl font-semibold text-neutral-800">Monthly Pass</h4>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold text-primary">₹5,000</span>
                    <span className="ml-2 text-neutral-600">/month</span>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="text-[#FF6B35] mr-2" size={16} />
                      <span>Dedicated desk with privacy</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-[#FF6B35] mr-2" size={16} />
                      <span>24/7 access</span>
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
                  >
                    <Link href="/contact">Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seat Details Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-800 mb-8 text-center">Available Seats</h2>
          <div className="grid grid-cols-3 gap-4">
            {seats.map((seat) => (
              <div key={seat.id} className="bg-white rounded-lg p-4 shadow-md">
                <div className="relative h-48 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                    alt="Professional Dedicated Desk Workspace"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
                    <span className="text-primary font-semibold">{seat.seatNumber}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-neutral-800">Dedicated Desk</h3>
                  <span className="text-lg font-semibold text-primary">₹{seat.price}</span>
                </div>
                <p className="text-neutral-600 mb-4">Dedicated Desk</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-neutral-700 mb-2">Status: {seat.status}</p>
                  {seat.bookedDates && seat.bookedDates.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-semibold text-neutral-800">Booked Dates:</p>
                      <div className="flex flex-wrap gap-2">
                        {seat.bookedDates.map((date) => (
                          <span key={date} className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm">
                            {new Date(date).toLocaleDateString()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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
                <Car className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Parking</h3>
              <p className="text-neutral-600">Secure parking facilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="mt-20 bg-primary text-white p-12 rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Ready to claim your dedicated workspace?</h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Experience the benefits of having your own private workspace with all the amenities you need to be productive.
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
  );
};

export default DedicatedDesk;
