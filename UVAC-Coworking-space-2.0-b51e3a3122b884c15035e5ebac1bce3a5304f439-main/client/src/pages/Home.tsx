import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ui/service-card";
import TestimonialCard from "@/components/ui/testimonial-card";
import FeatureCard from "@/components/ui/feature-card";
import LocationCard from "@/components/ui/location-card";
import { services } from "@/lib/services";
import { features } from "@/lib/features";
import { locations } from "@/lib/locations";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
// import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { MapModal } from '@/components/MapModal';
import ContactForm from '@/components/contact/ContactForm';

interface Testimonial {
  id: string;
  content: string;
  author: string;
  company: string;
  created_at: string;
}

const Home = () => {
  const testimonialContainerRef = useRef<HTMLDivElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Mock testimonials data to replace Supabase
    const mockTestimonials: Testimonial[] = [
      {
        id: '1',
        content: 'UVAC Coworking Space has transformed the way I work. The environment is professional, inspiring, and the community is amazing!',
        author: 'Sarah Johnson',
        company: 'Tech Innovations Inc.',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        content: 'Perfect location, excellent facilities, and great networking opportunities. Highly recommend for any entrepreneur or freelancer.',
        author: 'Michael Chen',
        company: 'Digital Solutions Ltd.',
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        content: 'The flexible workspace options and professional atmosphere make UVAC the ideal choice for our growing startup.',
        author: 'Emily Rodriguez',
        company: 'StartUp Ventures',
        created_at: new Date().toISOString()
      }
    ];
    
    setTestimonials(mockTestimonials);
  }, []);

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialContainerRef.current) {
      const scrollAmount = 300;
      testimonialContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[550px]" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80')" }}
      >
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">Your workspace, your way</h1>
            <p className="mt-4 text-xl text-white opacity-90">Find the perfect workspace solution to fit your business needs</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => setIsMapModalOpen(true)}
                className="bg-[#FF6B35] hover:bg-[#E55A24] text-white px-6 py-3 rounded-md transition-all duration-300 hover:scale-[1.02]"
              >
                Find a workspace
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary px-6 py-3 rounded-md transition-all duration-300 hover:scale-[1.02]"
              >
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <MapModal isOpen={isMapModalOpen} onClose={() => setIsMapModalOpen(false)} />

      {/* Services Overview */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800">Our Workspace Solutions</h2>
            <p className="mt-4 text-xl text-neutral-600 max-w-3xl mx-auto">
              From private offices to coworking spaces, we have the perfect solution for your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                price={service.price}
                image={service.image}
                link={service.link}
                className="transition-all duration-300 hover:scale-[1.02]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Service - Office Space */}
      <section id="office-space-details" className="py-16 bg-[#F0F6FF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <span className="text-primary font-semibold">Featured Service</span>
              <h2 className="text-3xl font-bold text-neutral-800">Professional Office Space</h2>
              <p className="text-lg text-neutral-700">
                Our private office spaces provide the perfect environment for your business to thrive. Each space is designed with productivity in mind and can be customized to meet your specific requirements.
              </p>
              
              <div className="space-y-4">
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
                  className="bg-primary hover:bg-blue-700 text-white px-6 py-3 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Link href="/contact">Inquire about Office Space</Link>
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Premium private office space" 
                className="rounded-lg shadow-lg w-full h-auto transition-all duration-300 hover:scale-[1.02]"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1586401100295-7a8096fd231a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Meeting area in private office" 
                  className="rounded-lg shadow-md w-full h-auto transition-all duration-300 hover:scale-[1.02]"
                />
                
                <img 
                  src="https://images.unsplash.com/photo-1623625434462-e5e42318ae49?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Office lounge area" 
                  className="rounded-lg shadow-md w-full h-auto transition-all duration-300 hover:scale-[1.02]"
                />
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
                      <span className="text-3xl font-bold text-primary">₹5,000</span>
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
                    </ul>
                  </div>
                  <div className="p-6">
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Link href="/contact">Book now</Link>
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
                      <span className="text-3xl font-bold text-primary">₹5,000</span>
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
                      <Link href="/contact">Book now</Link>
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
                      <span className="text-3xl font-bold text-primary">₹5,000</span>
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
                      <Link href="/contact">Book now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800">What Our Clients Say</h2>
            <p className="mt-4 text-xl text-neutral-600 max-w-3xl mx-auto">
              Join hundreds of satisfied businesses who have found their perfect workspace with us
            </p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                ref={testimonialContainerRef}
                className="flex carousel overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide"
                style={{ 
                  scrollSnapType: "x mandatory",
                  scrollBehavior: "smooth",
                  gap: "2rem"
                }}
              >
                {testimonials.length > 0 ? (
                  testimonials.map((testimonial, index) => (
                    <div 
                      key={testimonial.id} 
                      className="testimonial-card min-w-[300px] flex-1 scroll-snap-align-start"
                      style={{
                        scrollSnapAlign: "start",
                        backgroundColor: "#f8f9fa",
                        padding: "2rem",
                        borderRadius: "1rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        margin: "0 1rem"
                      }}
                    >
                      <p className="text-neutral-700 mb-4">{testimonial.content}</p>
                      <div className="testimonial-author flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
                          <span className="text-2xl font-bold">{testimonial.author[0]}</span>
                        </div>
                        <div>
                          <strong className="block text-neutral-800">{testimonial.author}</strong>
                          <span className="text-neutral-500 text-sm">{testimonial.company}</span>
                        </div>
                      </div>
                      <small className="block mt-2 text-neutral-500 text-sm">
                        {new Date(testimonial.created_at).toLocaleDateString()}
                      </small>
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center py-8">
                    <p className="text-neutral-500">No testimonials available yet.</p>
                  </div>
                )}
              </div>
            </div>
            
            <button 
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 text-neutral-800 hover:text-primary focus:outline-none hidden md:block transition-all duration-300 hover:scale-[1.02]"
              onClick={() => scrollTestimonials("left")}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button 
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 text-neutral-800 hover:text-primary focus:outline-none hidden md:block transition-all duration-300 hover:scale-[1.02]"
              onClick={() => scrollTestimonials("right")}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/about" className="inline-flex items-center text-primary font-medium hover:text-blue-700 transition-all duration-300 hover:scale-[1.02]">
              Read more success stories <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800">Why Choose Co-working Space?</h2>
            <p className="mt-4 text-xl text-neutral-600 max-w-3xl mx-auto">
              We provide everything you need to run your business professionally and efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="transition-all duration-300 hover:scale-[1.02]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      {/* <section className="py-16 bg-[#F0F6FF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800">Our Locations</h2>
            <p className="mt-4 text-xl text-neutral-600 max-w-3xl mx-auto">
              Find a Cowolocation workspace near you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <LocationCard
                key={index}
                name={location.name}
                address={location.address}
                image={location.image}
                link={location.link}
                className="transition-all duration-300 hover:scale-[1.02]"
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              asChild
              variant="outline" 
              className="px-6 py-3 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-[1.02]"
            >
              <Link href="#">View all locations</Link>
            </Button>
          </div>
        </div>
      </section> */}
      
      {user && (
        <button onClick={() => setIsContactOpen(true)}>
          Add Testimonial
        </button>
      )}
      
      <MapModal isOpen={isMapModalOpen} onClose={() => setIsMapModalOpen(false)} />
      <ContactForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onSuccess={() => setShowSuccessMessage(true)}
      />
    </div>
  );
};

export default Home;