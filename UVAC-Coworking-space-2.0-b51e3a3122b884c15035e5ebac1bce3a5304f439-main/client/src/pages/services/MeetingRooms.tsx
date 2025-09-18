import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PricingCard from "@/components/ui/pricing-card";

const MeetingRooms = () => {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[400px]" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')" }}
      >
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white leading-tight">Free Meeting Rooms</h1>
            <p className="mt-4 text-xl text-white opacity-90">
              Professional meeting spaces available for all members and visitors. Book your space now!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-neutral-800">Free Meeting Spaces</h2>
              <p className="mt-4 text-lg text-neutral-700">
                All our meeting rooms are available free of charge to our members and visitors. Whether you need a space for a quick meeting or a full-day event, we've got you covered.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Free for All</h3>
                    <p className="text-neutral-600">Available to all members and visitors at no cost</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Professional Amenities</h3>
                    <p className="text-neutral-600">High-speed internet, video conferencing, and smart displays included</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Flexible Booking</h3>
                    <p className="text-neutral-600">Book any room type for any duration via our online system</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Professional Support</h3>
                    <p className="text-neutral-600">On-site team to assist with setup and technical support</p>
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
                src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Modern conference room" 
                className="rounded-lg shadow-lg w-full h-auto transition-all duration-300 hover:scale-[1.02]"
              />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <img 
                  src="https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Small meeting room" 
                  className="rounded-lg shadow-md w-full h-auto transition-all duration-300 hover:scale-[1.02]"
                />
                
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Boardroom with presentation setup" 
                  className="rounded-lg shadow-md w-full h-auto transition-all duration-300 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
          
          {/* Room Types Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Our Meeting Spaces</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#F0F6FF] rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1574974671999-24b7dfbb0d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                  alt="Small meeting room" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-800">Interview Rooms</h3>
                  <p className="mt-2 text-neutral-600">Comfortable 4-person rooms perfect for interviews, small client meetings, or focused discussions.</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-green-600 font-semibold">Free Access</span>
                    <a href="#" className="text-[#FF6B35] font-medium hover:text-[#E55A24]">Book Now →</a>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#F0F6FF] rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                  alt="Medium conference room" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-800">Conference Rooms</h3>
                  <p className="mt-2 text-neutral-600">Spacious rooms for 8-12 people, ideal for team meetings, training sessions, and presentations.</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-green-600 font-semibold">Free Access</span>
                    <a href="#" className="text-[#FF6B35] font-medium hover:text-[#E55A24]">Book Now →</a>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#F0F6FF] rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                  alt="Executive boardroom" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-800">Executive Boardrooms</h3>
                  <p className="mt-2 text-neutral-600">Premium spaces for up to 20 people with executive furnishings and advanced presentation technology.</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-green-600 font-semibold">Free Access</span>
                    <Link to="/checkout/executive-boardroom" className="text-[#FF6B35] font-medium hover:text-[#E55A24]">Book Now →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Packages Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-neutral-800 text-center mb-8">Meeting Room Packages</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-neutral-200">
                    <h4 className="text-xl font-semibold text-neutral-800">Free Access</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">Free</span>
                    </div>
                    <p className="mt-2 text-neutral-600">No cost for all members and visitors</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>No minimum commitment</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Book any available room</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>High-speed Wi-Fi</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Basic AV equipment</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Complimentary beverages</span>
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

              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-neutral-200">
                    <h4 className="text-xl font-semibold text-neutral-800">Premium Package</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹1,000</span>
                      <span className="ml-1 text-neutral-600">/day</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Enhanced meeting experience</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Priority room booking</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Advanced AV equipment</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Technical support</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Professional catering</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Customized meeting setup</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Administrative support</span>
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
          
          {/* Additional Services */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Additional Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Catering Services</h3>
                <p className="text-neutral-700">From coffee and pastries to full lunch buffets, we offer a range of catering options for your meetings. Our team can customize menus to suit your preferences and dietary requirements.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Technical Support</h3>
                <p className="text-neutral-700">Our dedicated IT support team can assist with setting up video conferences, presentations, and other technical requirements for your meeting.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Administrative Support</h3>
                <p className="text-neutral-700">Need assistance with printing, copying, or other administrative tasks? Our team is available to help with any additional requirements for your meeting.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Event Planning</h3>
                <p className="text-neutral-700">For larger events or workshops, our event planning team can help coordinate all aspects of your meeting, from setup to catering to technical requirements.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-20 bg-primary text-white p-12 rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Ready to book your free meeting?</h2>
              <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
                Contact us today to check availability and secure your ideal meeting space. Our team is ready to assist with all your meeting requirements.
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
      </section>
    </div>
  );
};

export default MeetingRooms;
