import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Mock payment gateway for demo purposes
const CheckoutPage = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/checkout/:serviceId');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Service information would normally come from your database
  // This is just for demo purposes
  const [serviceInfo, setServiceInfo] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    features: [] as string[]
  });

  // Get service information based on the ID in the URL - using serviceId as dependency
  useEffect(() => {
    if (match && params && params.serviceId) {
      // In a real app, you would fetch this from an API
      // For demo purposes, we'll use sample data based on the service ID
      
      // Services data - in real app this would come from database
      const servicesData: Record<string, any> = {
        'office-space': {
          id: 'office-space',
          title: 'Office Space',
          description: 'Professional office space for your business',
          price: '₹15,000/month',
          numericPrice: 15000,
          features: [
            'Private office for your team',
            'High-speed internet',
            'Meeting room access',
            'Reception services',
            '24/7 access',
            'Utilities included'
          ]
        },
        'virtual-office': {
          id: 'virtual-office',
          title: 'Virtual Office',
          description: 'Professional business address without the physical space',
          price: '₹3,000/month',
          numericPrice: 3000,
          features: [
            'Professional business address',
            'Mail handling',
            'Call forwarding',
            'Meeting room credits',
            'Business lounge access'
          ]
        },
        'coworking': {
          id: 'coworking',
          title: 'Coworking Space',
          description: 'Flexible desk space in a collaborative environment',
          price: '₹8,000/month',
          numericPrice: 8000,
          features: [
            'Dedicated desk',
            'High-speed internet',
            'Meeting room credits',
            'Community events',
            '24/7 access',
            'Coffee and refreshments'
          ]
        },
        'meeting-rooms': {
          id: 'meeting-rooms',
          title: 'Meeting Room',
          description: 'Professional meeting space for your team and clients',
          price: '₹500/hour',
          numericPrice: 500,
          features: [
            'Professional meeting space',
            'Video conferencing equipment',
            'Whiteboard and flipcharts',
            'Coffee and refreshments',
            'Reception services'
          ]
        },
        'hot-desking': {
          id: 'hot-desking',
          title: 'Hot Desking',
          description: 'Flexible workspace solutions for mobile professionals',
          price: '₹5,000/month',
          numericPrice: 5000,
          features: [
            'Access to any available desk',
            'High-speed internet',
            'Meeting room credits',
            'Community events',
            'Coffee and refreshments'
          ]
        },
        'private-offices': {
          id: 'private-offices',
          title: 'Private Office',
          description: 'Secure, private workspace for your team',
          price: '₹20,000/month',
          numericPrice: 20000,
          features: [
            'Private, lockable office',
            'Dedicated high-speed internet',
            'Meeting room access',
            'Reception services',
            '24/7 access',
            'Utilities included',
            'Customizable space'
          ]
        },
        'business-address': {
          id: 'business-address',
          title: 'Business Address',
          description: 'Professional address for your business correspondence',
          price: '₹2,000/month',
          numericPrice: 2000,
          features: [
            'Use of our address for your business',
            'Mail handling and forwarding',
            'Notification of deliveries',
            'Optional meeting room access'
          ]
        },
        'telephone-answering': {
          id: 'telephone-answering',
          title: 'Telephone Answering',
          description: 'Professional call handling services',
          price: '₹3,500/month',
          numericPrice: 3500,
          features: [
            'Professional call answering',
            'Call forwarding',
            'Message taking',
            'Virtual receptionist',
            'Custom greeting'
          ]
        },
        'membership': {
          id: 'membership',
          title: 'Membership',
          description: 'Access to all Cowolocation facilities',
          price: '₹10,000/month',
          numericPrice: 10000,
          features: [
            'Access to all locations',
            'Priority booking for meeting rooms',
            'Community events',
            'Business networking',
            'Discounts on additional services',
            'Global lounge access'
          ]
        }
      };
      
      setServiceInfo(servicesData[params.serviceId] || {
        id: params.serviceId,
        title: 'Unknown Service',
        description: 'Service details not available',
        price: 'Price not available',
        features: []
      });
    }
  }, [match, params]);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // In a real application, you would make a call to your backend
      // to create a payment intent with Stripe
      // For this demo, we'll simulate a payment process
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setPaymentSuccess(true);
      toast({
        title: "Payment Successful!",
        description: `You have successfully subscribed to ${serviceInfo.title}. Thank you for your payment.`,
      });
      
      // Redirect to contact page after successful payment
      setTimeout(() => {
        setLocation('/contact');
      }, 3000);
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!serviceInfo.id) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Service Not Found</CardTitle>
            <CardDescription>The requested service could not be found</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => setLocation('/')}>Return to Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Complete Your Order</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your selected service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{serviceInfo.title}</h3>
                    <p className="text-muted-foreground">{serviceInfo.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">What's included:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {serviceInfo.features.map((feature, index) => (
                        <li key={index} className="text-sm">{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Payment Section */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Safe and secure payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentSuccess ? (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-700">
                      <h3 className="font-bold">Payment Successful!</h3>
                      <p className="text-sm">Thank you for your order. You will be redirected shortly.</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium">Price</span>
                        <span>{serviceInfo.price}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium">Tax</span>
                        <span>₹0.00</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center py-2 font-bold">
                        <span>Total</span>
                        <span>{serviceInfo.price}</span>
                      </div>
                    
                      {/* Demo Card Fields */}
                      <div className="space-y-3 mt-6">
                        <div className="border rounded-md p-3">
                          <div className="text-sm font-medium mb-1">Card Number</div>
                          <div className="bg-slate-100 dark:bg-slate-800 h-9 rounded-md flex items-center px-3 text-muted-foreground">
                            4242 4242 4242 4242
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="border rounded-md p-3">
                            <div className="text-sm font-medium mb-1">Expiry</div>
                            <div className="bg-slate-100 dark:bg-slate-800 h-9 rounded-md flex items-center px-3 text-muted-foreground">
                              12/25
                            </div>
                          </div>
                          <div className="border rounded-md p-3">
                            <div className="text-sm font-medium mb-1">CVC</div>
                            <div className="bg-slate-100 dark:bg-slate-800 h-9 rounded-md flex items-center px-3 text-muted-foreground">
                              123
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {!paymentSuccess && (
                  <Button 
                    onClick={handlePayment} 
                    disabled={loading || paymentSuccess} 
                    className="w-full"
                  >
                    {loading ? "Processing..." : "Complete Payment"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;