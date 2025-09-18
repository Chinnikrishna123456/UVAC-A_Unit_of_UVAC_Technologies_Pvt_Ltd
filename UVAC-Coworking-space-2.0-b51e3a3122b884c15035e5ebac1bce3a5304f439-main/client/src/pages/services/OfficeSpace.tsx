import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PricingCard from "@/components/ui/pricing-card";

const officeSpace = () => {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[400px]" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')" }}
      >
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white leading-tight">Office Space</h1>
            <p className="mt-4 text-xl text-white opacity-90">
              Professional, private office spaces tailored to your needs, available on flexible terms.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="lg:order-2">
              <h2 className="text-3xl font-bold text-neutral-800 mb-4">Professional Private Offices</h2>
              <p className="text-lg text-neutral-700 mb-6">
                Our private office spaces provide the perfect environment for your business to thrive. Each space is designed with productivity in mind and can be customized to meet your specific requirements.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Flexible Terms</h3>
                    <p className="text-neutral-600">Month-to-month, yearly, or custom terms to suit your business needs</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Fully Furnished</h3>
                    <p className="text-neutral-600">Modern, ergonomic furniture ready for you to move in and get to work</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">All-Inclusive Pricing</h3>
                    <p className="text-neutral-600">Utilities, high-speed internet, cleaning services, and more included</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Business Support</h3>
                    <p className="text-neutral-600">Reception services, mail handling, and administrative assistance</p>
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
            
            <div className="lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Premium private office space" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Benefits of Our Office Spaces</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Time Efficiency</h3>
                <p className="text-neutral-700">Move in immediately with no setup time or capital investment needed.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Prestige & Privacy</h3>
                <p className="text-neutral-700">Impress clients with professional spaces while maintaining complete privacy.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Scalable Solutions</h3>
                <p className="text-neutral-700">Easily upgrade to larger spaces as your business grows without long-term commitments.</p>
              </div>
            </div>
          </div>
          
          {/* Pricing Tiers */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-neutral-800 text-center mb-8">Office Space Pricing Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Standard Office */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-neutral-200">
                    <h4 className="text-xl font-semibold text-neutral-800">Standard Office</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹15,000</span>
                      <span className="ml-1 text-neutral-600">/month</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Perfect for small teams or individuals</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>1-2 person office</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>8 hours meeting room credits</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Business address</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>High-speed Wi-Fi</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Communal kitchen access</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>24/7 access</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Professional cleaning</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Secure storage</span>
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
              
              {/* Executive Office */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-neutral-200">
                    <h4 className="text-xl font-semibold text-neutral-800">Executive Office</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹30,000</span>
                      <span className="ml-1 text-neutral-600">/month</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Our most popular option for growing teams</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>3-4 person office</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>20 hours meeting room credits</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Premium business address</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Dedicated high-speed Wi-Fi</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Phone answering service</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>24/7 office access</span>
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
              
              {/* Premium Office Suite */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-neutral-200">
                    <h4 className="text-xl font-semibold text-neutral-800">Premium Office Suite</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹40,000</span>
                      <span className="ml-1 text-neutral-600">/month</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Ideal for established teams</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>5-8 person office suite</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>40 hours meeting room credits</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Premium business address</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Dedicated fiber internet</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Dedicated phone line</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Private meeting room</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Admin support (5hrs/week)</span>
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
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">What's included in my office rental?</h3>
                <p className="text-neutral-700">Our office rentals include fully furnished workspace, high-speed internet, utilities, cleaning services, reception services, and 24/7 security access.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Can I customize my office space?</h3>
                <p className="text-neutral-700">Yes, we offer various customization options for our office spaces. Our team can work with you to ensure your office meets your specific requirements.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">What is the minimum contract period?</h3>
                <p className="text-neutral-700">Our minimum contract period is one month, but we offer discounts for longer-term commitments. We also have flexible options that can be tailored to your needs.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Can I access the office outside business hours?</h3>
                <p className="text-neutral-700">Yes, our Executive and Premium plans come with 24/7 access. Standard plan members can upgrade to 24/7 access for an additional fee.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-20 bg-primary text-white p-12 rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Ready to find your perfect office space?</h2>
              <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
                Contact us today to discuss your requirements or schedule a tour of our facilities.
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

export default officeSpace;
