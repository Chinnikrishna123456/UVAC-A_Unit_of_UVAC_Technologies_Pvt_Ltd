import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PricingCard from "@/components/ui/pricing-card";

const Coworking = () => {
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
            <h1 className="text-4xl font-bold text-white leading-tight">Coworking</h1>
            <p className="mt-4 text-xl text-white opacity-90">
              Collaborative workspace environments designed for networking and productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-3xl font-bold text-neutral-800">Collaborative Workspaces</h2>
              <p className="mt-4 text-lg text-neutral-700">
                Our coworking spaces provide a dynamic, collaborative environment where entrepreneurs, freelancers, and businesses of all sizes can thrive together. Experience the perfect balance of professional amenities and community engagement.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Productive Environment</h3>
                    <p className="text-neutral-600">Carefully designed spaces to maximize productivity and creativity</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Networking Opportunities</h3>
                    <p className="text-neutral-600">Regular events and a diverse community of professionals</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Flexible Membership Options</h3>
                    <p className="text-neutral-600">Choose from daily, weekly, or monthly plans with no long-term commitment</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="text-[#FF6B35] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Professional Amenities</h3>
                    <p className="text-neutral-600">High-speed internet, meeting rooms, printing services, and more</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  asChild 
                  className="bg-primary hover:bg-blue-700 text-white px-6 py-3"
                >
                  <Link href="/contact">Book a Coworking Space</Link>
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Modern coworking space" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Collaborative meeting in coworking space" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
                
                <img 
                  src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Professionals networking in coworking space" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Benefits of Coworking</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Community & Networking</h3>
                <p className="text-neutral-700">Connect with like-minded professionals and potential collaborators.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Cost Efficiency</h3>
                <p className="text-neutral-700">Reduce overhead costs with all-inclusive pricing and flexible terms.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Work-Life Balance</h3>
                <p className="text-neutral-700">Separate work from home life while maintaining flexibility in your schedule.</p>
              </div>
            </div>
          </div>
          
         
          
          {/* Membership Options */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-800">Coworking Membership Options</h2>
              <p className="mt-4 text-xl text-neutral-600 max-w-3xl mx-auto">
                Choose the perfect coworking plan that fits your needs and budget
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  id: "basic",
                  title: "Basic",
                  description: "Perfect for solo entrepreneurs and freelancers",
                  price: "₹8,000/month",
                  features: [
                    "24/7 Access",
                    "High-speed WiFi",
                    "Print Services",
                    "Meeting Room Access",
                    "Coffee & Tea",
                    "Event Space"
                  ]
                },
                {
                  id: "premium",
                  title: "Premium",
                  description: "Ideal for growing teams",
                  price: "₹12,000/month",
                  features: [
                    "24/7 Access",
                    "Dedicated Desk",
                    "High-speed WiFi",
                    "Unlimited Meeting Rooms",
                    "Coffee & Tea",
                    "Event Space",
                    "Storage",
                    "Virtual Office"
                  ]
                },
                {
                  id: "enterprise",
                  title: "Enterprise",
                  description: "Custom solutions for large teams",
                  price: "₹18,000/month",
                  features: [
                    "24/7 Access",
                    "Private Office",
                    "Dedicated Team Space",
                    "High-speed WiFi",
                    "Unlimited Meeting Rooms",
                    "Coffee & Tea",
                    "Event Space",
                    "Storage",
                    "Virtual Office",
                    "Custom Branding"
                  ]
                }
              ].map((plan) => (
                <div key={plan.id} className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-neutral-800 mb-2">{plan.title}</h3>
                    <p className="text-neutral-600 mb-4">{plan.description}</p>
                    <div className="text-3xl font-bold text-primary mb-6">{plan.price}</div>
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-neutral-600">
                          <Check className="w-5 h-5 text-primary mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button 
                    asChild 
                    className="w-full mt-6 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Link href={`/contact?plan=${plan.id}`}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Can I use coworking spaces for client meetings?</h3>
                <p className="text-neutral-700">Yes, you can book meeting rooms for client meetings. All memberships include meeting room credits that you can use to reserve professional meeting spaces.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Do you have quiet zones for focused work?</h3>
                <p className="text-neutral-700">Yes, our coworking spaces include designated quiet zones for focused work, as well as collaborative areas for team projects and discussions.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Can I upgrade my membership as my team grows?</h3>
                <p className="text-neutral-700">Absolutely. Our flexible membership options allow you to easily scale up as your team expands, from hot desks to dedicated team spaces.</p>
              </div>
              
              <div className="bg-[#F0F6FF] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">What networking opportunities are available?</h3>
                <p className="text-neutral-700">We host regular networking events, workshops, and social gatherings to facilitate connections between members and foster a vibrant community.</p>
              </div>
            </div>
          </div>
          
          {/* Locations Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-neutral-800 text-center mb-12">Our Locations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-[#F0F6FF] rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1616587894289-86480e533129?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" 
                  alt="Nellore Coworking Space" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-800">Nellore Location</h3>
                  <p className="mt-2 text-neutral-700">
                    Our flagship location in Nellore offers modern coworking spaces with premium amenities in the heart of the city.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Prime location with excellent accessibility</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Recently renovated modern interiors</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Full suite of amenities and services</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="w-full">
                      <Link href="/locations/nellore">View Location Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#F0F6FF] rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" 
                  alt="Coming Soon: New Location" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded inline-block mb-2">Coming Soon</div>
                  <h3 className="text-xl font-bold text-neutral-800">New Location Opening Soon</h3>
                  <p className="mt-2 text-neutral-700">
                    We're expanding our network of coworking spaces. Stay tuned for announcements about our newest location.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>State-of-the-art facilities</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Convenient, central location</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Pre-opening membership discounts available</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/contact">Join Waitlist</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-primary text-white p-12 rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Ready to join our coworking community?</h2>
              <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
                Experience the benefits of a dynamic workspace environment. Contact us today to schedule a tour or sign up for a membership.
              </p>
              <div className="mt-8">
                <Button 
                  asChild 
                  className="bg-white text-primary hover:bg-neutral-100 px-6 py-3"
                >
                  <Link href="/contact">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coworking;
