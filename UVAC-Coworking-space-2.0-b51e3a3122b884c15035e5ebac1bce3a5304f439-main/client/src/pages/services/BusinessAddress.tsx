import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PricingCard from "@/components/ui/pricing-card";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const BusinessAddress = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[400px]" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')" }}
      >
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white leading-tight">Business Address</h1>
            <p className="mt-4 text-xl text-white opacity-90">
              Use our prestigious address for your business correspondence and registration.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Add your main content here */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-800 mb-8">Why Choose Our Business Address Service?</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Check className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold text-neutral-700">Professional Location</h3>
                <p className="text-neutral-600">Our business address is located in a prestigious business district, enhancing your professional image.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Check className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold text-neutral-700">Mail Handling</h3>
                <p className="text-neutral-600">We handle all your business mail and correspondence professionally and efficiently.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Check className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold text-neutral-700">Virtual Reception</h3>
                <p className="text-neutral-600">Professional telephone answering and message forwarding services included.</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/contact">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessAddress;
