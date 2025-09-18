import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2 } from 'lucide-react';
import LocationMap from '@/components/ui/map';

const NelloreLocation = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Location details for Nellore
  const locationData = {
    name: "Cowolocation Nellore",
    address: "2nd Floor, Business Center, Main Road, Nellore, Andhra Pradesh, India",
    coordinates: {
      lat: 14.4426,
      lng: 79.9865
    },
    description: "Our Nellore center offers modern workspace solutions in the heart of the city. Designed for productivity and collaboration, our facilities provide the perfect environment for businesses of all sizes.",
    amenities: [
      "High-speed internet",
      "24/7 access",
      "Meeting rooms",
      "Reception services",
      "Coffee and refreshments",
      "Air conditioning",
      "Video conferencing facilities",
      "Printing and scanning services",
      "Mail handling",
      "Dedicated parking"
    ],
    plans: [
      {
        id: "hot-desking",
        title: "Hot Desking",
        price: "₹5,000/month",
        features: [
          "Access to shared workspace",
          "High-speed internet",
          "Use of common areas",
          "2 hours of meeting room access/month"
        ]
      },
      {
        id: "dedicated-desk",
        title: "Dedicated Desk",
        price: "₹8,000/month",
        features: [
          "Your own permanent desk",
          "High-speed internet",
          "Use of common areas",
          "4 hours of meeting room access/month",
          "Storage locker"
        ]
      },
      {
        id: "private-office",
        title: "Private Office",
        price: "₹20,000/month",
        featured: true,
        features: [
          "Private, lockable office",
          "High-speed internet",
          "Use of common areas",
          "8 hours of meeting room access/month",
          "Storage space",
          "Dedicated phone line"
        ]
      },
      {
        id: "virtual-office",
        title: "Virtual Office",
        price: "₹3,000/month",
        features: [
          "Business address",
          "Mail handling",
          "Call answering",
          "2 hours of meeting room access/month"
        ]
      }
    ],
    hours: {
      monday: "8:00 AM - 8:00 PM",
      tuesday: "8:00 AM - 8:00 PM",
      wednesday: "8:00 AM - 8:00 PM",
      thursday: "8:00 AM - 8:00 PM",
      friday: "8:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "Closed"
    },
    contact: {
      phone: "+91 1234567890",
      email: "nellore@cowolocation.com"
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{locationData.name}</h1>
      <p className="text-muted-foreground mb-8">{locationData.address}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          {/* Location Map */}
          <LocationMap location={locationData} />
        </div>
        
        <div>
          {/* Quick Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Location Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Opening Hours</h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Monday</span>
                    <span>{locationData.hours.monday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tuesday</span>
                    <span>{locationData.hours.tuesday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wednesday</span>
                    <span>{locationData.hours.wednesday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thursday</span>
                    <span>{locationData.hours.thursday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday</span>
                    <span>{locationData.hours.friday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>{locationData.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>{locationData.hours.sunday}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">Contact</h3>
                <div className="text-sm space-y-1">
                  <div>Phone: {locationData.contact.phone}</div>
                  <div>Email: {locationData.contact.email}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Plans & Pricing</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>About This Location</CardTitle>
              <CardDescription>Our Nellore workspace center</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{locationData.description}</p>
              <p>
                Perfectly located in the center of Nellore, our workspace offers easy access to local
                businesses, restaurants, and transport links. The modern design creates an inspiring
                environment where productivity and creativity flourish.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locationData.plans.map((plan) => (
              <Card key={plan.id} className={plan.featured ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>
                    <span className="text-lg font-bold">{plan.price}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to={`/checkout/${plan.id}`}>
                    <Button className="w-full">Select Plan</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="amenities">
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
              <CardDescription>Everything you need for a productive workday</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locationData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NelloreLocation;