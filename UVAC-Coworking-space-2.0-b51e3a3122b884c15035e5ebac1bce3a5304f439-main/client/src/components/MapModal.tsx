import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin } from "lucide-react";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapModal = ({ isOpen, onClose }: MapModalProps) => {
  const address = {
    name: "ORYFOLKS Private Limited",
    street: "25/11/123, 3rd St, opp. Nippo",
    area: "Savithri Nagar, Vedayapalem",
    city: "Nellore",
    state: "Andhra Pradesh",
    pincode: "524004"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Our Location</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">{address.name}</h3>
            </div>
            <p className="text-neutral-700">{address.street}</p>
            <p className="text-neutral-700">{address.area}</p>
            <p className="text-neutral-700">{address.city}, {address.state}</p>
            <p className="text-neutral-700">Pincode: {address.pincode}</p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.0415004500114!2d80.48255121484375!3d14.42885798801931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a402b0680808081%3A0x2f9f9f9f9f9f9f9f!2sNellore%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1686806626545!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
