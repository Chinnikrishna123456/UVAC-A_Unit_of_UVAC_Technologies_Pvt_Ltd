import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PricingCard from "@/components/ui/pricing-card";

const PrivateOffices = () => {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[400px]" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')" }}
      >
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white leading-tight">Private Offices</h1>
            <p className="mt-4 text-xl text-white opacity-90">
              Fully furnished private offices with all the amenities for teams of any size.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-3xl font-bold text-neutral-800">Executive Private Workspaces</h2>
              <p className="mt-4 text-lg text-neutral-700">
                Our private office solutions provide your team with a dedicated, secure workspace designed to enhance productivity and project a professional image. Each office is fully equipped with everything you need to hit the ground running from day one.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Complete Privacy</h3>
                    <p className="text-neutral-600">Secure, lockable office space for confidential work and discussions</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Premium Furnishings</h3>
                    <p className="text-neutral-600">Ergonomic furniture, executive desks, and storage solutions included</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Scalable Solutions</h3>
                    <p className="text-neutral-600">Offices for 1-20+ people with the ability to expand as your team grows</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">All-Inclusive Service</h3>
                    <p className="text-neutral-600">Utilities, high-speed internet, cleaning, and reception services included</p>
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
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Premium private office" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Executive desk in private office" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
                
                <img 
                  src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Team meeting in private office" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Benefits of Private Offices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Privacy & Security</h3>
                <p className="text-neutral-700">Confidential meetings, secure storage, and the ability to customize your workspace.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Increased Productivity</h3>
                <p className="text-neutral-700">Distraction-free environment that promotes focus and teamwork efficiency.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Professional Image</h3>
                <p className="text-neutral-700">Impressive space to host clients and showcase your business identity.</p>
              </div>
            </div>
          </div>
          
          {/* Office Types Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Our Private Office Solutions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-neutral-200">
                    <h4 className="text-xl font-semibold text-neutral-800">Executive Office</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹8,000</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Perfect for individuals or small teams</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>1-3 person office</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Premium furniture</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>High-speed internet</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>24/7 access</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Business address</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>10 hours meeting room credits</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Reception services</span>
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
                    <h4 className="text-xl font-semibold text-neutral-800">Team Office</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹8,000</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Ideal for growing teams</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>4-8 person office</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Premium furniture</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>High-speed dedicated internet</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>24/7 access with security</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Business address with mail handling</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>20 hours meeting room credits</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Reception services</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Dedicated phone line</span>
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
                    <h4 className="text-xl font-semibold text-neutral-800">Corporate Suite</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹8,000</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Comprehensive solution for established teams</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>9-15 person office suite</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Executive furniture</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Dedicated fiber internet</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>24/7 access with enhanced security</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Premium business address</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>40 hours meeting room credits</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Dedicated reception services</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Private meeting room included</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Administrative support (10hrs/week)</span>
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
          
          {/* Features Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Additional Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Customization Options</h3>
                <p className="text-neutral-700">We can customize your office with your company branding, specific layout requirements, and additional technology solutions to create a workspace that perfectly represents your brand.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Advanced Technology</h3>
                <p className="text-neutral-700">Benefit from smart office technology including video conferencing equipment, intelligent room booking systems, and security access controls tailored to your needs.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Business Support Services</h3>
                <p className="text-neutral-700">Optional administrative support, IT assistance, and professional services to help your business operate smoothly and efficiently within your private office.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Networking Opportunities</h3>
                <p className="text-neutral-700">Even with your private space, you'll have access to our community events, business lounges, and networking opportunities to connect with other professionals.</p>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">How quickly can I move in?</h3>
                <p className="text-neutral-700">Most private offices are move-in ready within 24-48 hours. For custom configurations, we typically require 1-2 weeks to prepare the space to your specifications.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Can I bring my own furniture?</h3>
                <p className="text-neutral-700">While our offices come fully furnished, we can accommodate requests to bring specific items or remove our furniture if you prefer to use your own. This can be discussed during your consultation.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">What is the minimum contract length?</h3>
                <p className="text-neutral-700">Our standard agreements start at 3 months, but we offer flexible terms including month-to-month options with a slight premium. Longer commitments come with preferential rates.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Can I upgrade as my team grows?</h3>
                <p className="text-neutral-700">Absolutely. One of the key benefits of our private offices is the ability to easily scale up as your team expands. We'll work with you to find larger spaces within our facilities when needed.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-20 bg-primary text-white p-12 rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Ready for your own private workspace?</h2>
              <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
                Contact us today to discuss your requirements or schedule a tour of our private office spaces. We'll help you find the perfect solution for your team.
              </p>
              <div className="mt-8">
                <Button 
                  asChild 
                  className="bg-white text-primary hover:bg-neutral-100 px-6 py-3"
                >
                  <Link href="/contact">Book a Tour</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivateOffices;
