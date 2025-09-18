import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PricingCard from "@/components/ui/pricing-card";

const TelephoneAnswering = () => {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[400px]" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')" }}
      >
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white leading-tight">Telephone Answering</h1>
            <p className="mt-4 text-xl text-white opacity-90">
              Professional call handling services to ensure you never miss an important call.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-3xl font-bold text-neutral-800">Never Miss an Important Call</h2>
              <p className="mt-4 text-lg text-neutral-700">
                Our professional telephone answering service ensures that your business calls are handled with the highest level of professionalism. Our trained receptionists act as an extension of your team, answering calls in your company name and managing them according to your instructions.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Professional Reception</h3>
                    <p className="text-neutral-600">Calls answered in your company name by trained professional receptionists</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Call Management</h3>
                    <p className="text-neutral-600">Calls screened, transferred, or messages taken based on your instructions</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Dedicated Number</h3>
                    <p className="text-neutral-600">Local or toll-free number dedicated to your business</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Real-Time Notifications</h3>
                    <p className="text-neutral-600">Instant message delivery via email, SMS, or our mobile app</p>
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
                src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Professional receptionist answering calls" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Call handling service" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
                
                <img 
                  src="https://images.unsplash.com/photo-1560264418-c4445382edbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Business call center" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Benefits of Professional Call Handling</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Professional Image</h3>
                <p className="text-neutral-700">Enhance your company's reputation with consistently professional call handling.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Never Miss Opportunities</h3>
                <p className="text-neutral-700">Capture every business opportunity with 24/7 call answering capability.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Focus on Core Business</h3>
                <p className="text-neutral-700">Concentrate on growing your business while we handle your calls efficiently.</p>
              </div>
            </div>
          </div>
          
          {/* Service Plans */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Telephone Answering Packages</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-neutral-200">
                    <h4 className="text-xl font-semibold text-neutral-800">Starter</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹8,000</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Basic call handling</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>50 calls per month</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Business hours coverage</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Call screening</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Message taking</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Email message delivery</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Monthly call report</span>
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
                    <h4 className="text-xl font-semibold text-neutral-800">Business</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹8,000</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Comprehensive call management</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>100 calls per month</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Extended hours coverage</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Call screening & forwarding</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Personalized greeting</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Email & SMS notifications</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Basic call routing options</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Weekly call reports</span>
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
                    <h4 className="text-xl font-semibold text-neutral-800">Executive</h4>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-primary">₹8,000</span>
                    </div>
                    <p className="mt-2 text-neutral-600">Premium call handling solution</p>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>200 calls per month</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>24/7 coverage</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Advanced call routing</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Customized call scripts</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Multiple transfer options</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Client information capture</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Real-time dashboard access</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="text-[#FF6B35] mr-2" size={16} />
                        <span>Dedicated account manager</span>
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
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Call Screening</h3>
                <p className="text-neutral-700">Our receptionists can screen calls based on your criteria, ensuring you only receive calls that require your immediate attention while others are handled appropriately.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Custom Greetings</h3>
                <p className="text-neutral-700">We'll answer calls with your customized greeting, creating a seamless experience for your callers that maintains your brand identity.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Appointment Scheduling</h3>
                <p className="text-neutral-700">Our receptionists can access your calendar and schedule appointments during calls, saving you time and ensuring a professional booking experience.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Multilingual Support</h3>
                <p className="text-neutral-700">For businesses with international clients, we offer multilingual call answering in major languages to better serve your global audience.</p>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">How quickly will calls be answered?</h3>
                <p className="text-neutral-700">Our standard is to answer all calls within three rings. We pride ourselves on prompt, professional service that represents your business well.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Can I change my call handling instructions?</h3>
                <p className="text-neutral-700">Yes, you can update your call handling instructions at any time through our online portal or by contacting your account manager.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">What happens if I exceed my monthly call volume?</h3>
                <p className="text-neutral-700">Additional calls are charged at a per-call rate. We'll notify you when you're approaching your limit so you can decide whether to upgrade your plan.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Can I keep my existing phone number?</h3>
                <p className="text-neutral-700">Yes, in most cases we can port your existing number to our service. Alternatively, we can provide you with a new local or toll-free number.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-20 bg-primary text-white p-12 rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Ready to upgrade your call handling?</h2>
              <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
                Ensure you never miss an important call again. Our professional telephone answering service will help you capture every opportunity and maintain a polished business image.
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

export default TelephoneAnswering;
