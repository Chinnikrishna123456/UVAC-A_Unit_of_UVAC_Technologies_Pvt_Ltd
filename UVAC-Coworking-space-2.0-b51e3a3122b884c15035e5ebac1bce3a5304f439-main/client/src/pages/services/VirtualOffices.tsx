import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PricingCard from "@/components/ui/pricing-card";

const VirtualOffices = () => {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[400px]" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')" }}
      >
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white leading-tight">Virtual Offices</h1>
            <p className="mt-4 text-xl text-white opacity-90">
              Establish a professional business presence without the physical office space.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-3xl font-bold text-neutral-800">Professional Business Identity</h2>
              <p className="mt-4 text-lg text-neutral-700">
                Our virtual office solutions give your business a professional image and prestigious address without the cost of a physical office. Perfect for remote teams, entrepreneurs, and businesses expanding to new markets.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Prestigious Business Address</h3>
                    <p className="text-neutral-600">Use our premium address on your business cards, website, and marketing materials</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Mail Handling</h3>
                    <p className="text-neutral-600">Professional mail receipt, scanning, forwarding, or storage based on your preferences</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Call Answering Services</h3>
                    <p className="text-neutral-600">Dedicated phone number with professional receptionists to answer calls in your company name</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Meeting Room Access</h3>
                    <p className="text-neutral-600">Pay-as-you-go access to professional meeting spaces when you need them</p>
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
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Professional mail handling service" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Professional call handling service" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
                
                <img 
                  src="https://images.unsplash.com/photo-1557425955-df376b5903c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Business mail sorting" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Benefits of Virtual Offices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Professional Image</h3>
                <p className="text-neutral-700">Project a professional business image with a prestigious address and receptionist services.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Cost Savings</h3>
                <p className="text-neutral-700">Eliminate the overhead of physical office space while maintaining a professional presence.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Business Flexibility</h3>
                <p className="text-neutral-700">Work from anywhere while maintaining a stable business address and phone number.</p>
              </div>
            </div>
          </div>
          
          {/* Pricing Tiers */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Virtual Office Packages</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-neutral-200">
                    <h4 className="text-xl font-semibold text-neutral-800">Basic Virtual Office</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹3,000</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Essential business presence</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Business address</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Mail handling and forwarding</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Business listing on directory</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Pay-as-you-go meeting rooms</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Online account management</span>
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
                    <h4 className="text-xl font-semibold text-neutral-800">Professional Virtual Office</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹6,000</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Complete virtual solution</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Premium business address</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Mail handling and forwarding</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Dedicated phone number</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Call answering in company name</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>5 hours meeting room credits</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Business listing on directory</span>
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
                    <h4 className="text-xl font-semibold text-neutral-800">Premium Virtual Office</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹9,000</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Comprehensive business presence</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Premium business address</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Mail handling and forwarding</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Dedicated phone number</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Personalized call answering</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>10 hours meeting room credits</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Business lounge access</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Occasional day office use</span>
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

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Can I use the address for official business registration?</h3>
                <p className="text-neutral-700">Yes, our virtual office addresses can be used for business registration, licensing, and other official documentation.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">How quickly will I be notified of received mail?</h3>
                <p className="text-neutral-700">You'll be notified within 24 hours of mail receipt. We can scan important items immediately upon request.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">How does the call answering service work?</h3>
                <p className="text-neutral-700">Our professional receptionists answer calls in your company name and can take messages, forward calls to you, or provide basic information to callers based on your instructions.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Can I upgrade to a physical office later?</h3>
                <p className="text-neutral-700">Absolutely. Our flexible solutions make it easy to transition from a virtual office to a physical workspace as your business grows.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-20 bg-primary text-white p-12 rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Get started with your Virtual Office today</h2>
              <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
                Establish a professional business presence without the overhead of a physical office. Our virtual office solutions are designed to help your business succeed.
              </p>
              <div className="mt-8">
                <Button 
                  asChild 
                  className="bg-white text-primary hover:bg-neutral-100 px-6 py-3"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VirtualOffices;
