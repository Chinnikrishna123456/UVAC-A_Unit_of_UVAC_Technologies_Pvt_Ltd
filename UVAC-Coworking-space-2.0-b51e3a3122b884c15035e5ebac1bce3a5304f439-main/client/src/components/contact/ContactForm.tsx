import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useSubmitContactForm } from '@/lib/api/contact';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onTestimonialSubmit?: (content: string, author: string, company: string) => void;
}

const services = [
  'Business Address',
  'Coworking Space',
  'Dedicated Desk',
  'Hot Desking',
  'Meeting Rooms',
  'Membership',
  'Office Space',
  'Private Offices',
  'Telephone Answering',
  'Virtual Offices'
];

export default function ContactForm({ 
  isOpen,
  onClose,
  onSuccess,
  onTestimonialSubmit
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [service, setService] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [testimonialContent, setTestimonialContent] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'testimonial'>('contact');
  const { mutate: submitContactForm, isPending } = useSubmitContactForm();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      if (!isOpen) {
        setName('');
        setEmail('');
        setMobile('');
        setService('');
        setPreferredDate('');
        setMessage('');
        setTestimonialContent('');
        setCompany('');
        setIsSubmitted(false);
        setActiveTab('contact');
      }
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const formData = {
        name,
        email,
        phone: mobile,
        service: service || null,
        message,
        preferredDate: preferredDate || null,
        subscribe: true,
      };
      
      console.log('Submitting contact form data:', formData);
      
      await submitContactForm(formData);
      
      console.log('Form submission successful');
      setName('');
      setEmail('');
      setMobile('');
      setService('');
      setMessage('');
      setPreferredDate('');
      
      setIsSubmitted(true);
      onSuccess();
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error('Form submission error:', error);
      // Show error message to user
      alert(error.message || 'An error occurred while submitting the form. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialContent || !name) return;
    
    try {
      if (onTestimonialSubmit) {
        await onTestimonialSubmit(testimonialContent, name, company);
        setTestimonialContent('');
        setCompany('');
        setIsSubmitted(true);
        onSuccess();
        
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('Failed to submit testimonial. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
            <div className="flex-1 overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white px-4 py-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    {activeTab === 'contact' ? 'Contact Us' : 'Share Your Experience'}
                  </h2>
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close panel</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                
                {/* Tabs */}
                <div className="mt-4">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      <button
                        type="button"
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'contact'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveTab('contact')}
                      >
                        Send a Message
                      </button>
                      {onTestimonialSubmit && (
                        <button
                          type="button"
                          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'testimonial'
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                          onClick={() => setActiveTab('testimonial')}
                        >
                          Write a Testimonial
                        </button>
                      )}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="px-4 py-6 sm:px-6">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Thank you!</h3>
                    <p className="text-gray-500">
                      {activeTab === 'contact' 
                        ? 'Your message has been sent. We\'ll get back to you soon!'
                        : 'Thank you for sharing your experience with us!'}
                    </p>
                  </div>
                ) : activeTab === 'contact' ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                        <input
                          type="tel"
                          id="mobile"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
                        <select
                          id="service"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="">Select a service</option>
                          {services.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                        <input
                          type="date"
                          id="preferredDate"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message *</label>
                        <textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={4}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={formLoading}
                        className="px-4 py-2"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={formLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                      >
                        {formLoading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="testimonialName" className="block text-sm font-medium text-gray-700">Your Name *</label>
                        <input
                          type="text"
                          id="testimonialName"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">Your Company (Optional)</label>
                        <input
                          type="text"
                          id="company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700">Your Testimonial *</label>
                        <textarea
                          id="testimonial"
                          value={testimonialContent}
                          onChange={(e) => setTestimonialContent(e.target.value)}
                          rows={4}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Share your experience with us..."
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={formLoading}
                        className="px-4 py-2"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={formLoading}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm"
                      >
                        {formLoading ? 'Submitting...' : 'Submit Testimonial'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
