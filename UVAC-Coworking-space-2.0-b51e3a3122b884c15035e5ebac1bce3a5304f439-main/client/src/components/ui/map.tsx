import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from './card';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  location: {
    name: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

const LocationMap: React.FC<LocationMapProps> = ({ location }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a simple static map display
    // In a real app, you would use Google Maps API or another mapping service
    if (mapRef.current) {
      const mapElement = mapRef.current;
      
      // Set background and styles for the map container
      mapElement.style.background = '#e5e7eb';
      mapElement.style.position = 'relative';
      mapElement.style.overflow = 'hidden';
      
      // Create a marker element
      const marker = document.createElement('div');
      marker.style.position = 'absolute';
      marker.style.left = '50%';
      marker.style.top = '50%';
      marker.style.transform = 'translate(-50%, -50%)';
      marker.innerHTML = `
        <div style="
          color: #ef4444; 
          font-size: 24px; 
          filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1));
        ">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `;
      
      // Add the marker to the map
      mapElement.appendChild(marker);
      
      // Add location name
      const locationLabel = document.createElement('div');
      locationLabel.style.position = 'absolute';
      locationLabel.style.left = '50%';
      locationLabel.style.bottom = '10px';
      locationLabel.style.transform = 'translateX(-50%)';
      locationLabel.style.backgroundColor = 'white';
      locationLabel.style.padding = '4px 8px';
      locationLabel.style.borderRadius = '4px';
      locationLabel.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.1)';
      locationLabel.style.fontSize = '12px';
      locationLabel.style.fontWeight = 'bold';
      locationLabel.innerText = location.name;
      
      mapElement.appendChild(locationLabel);
    }
  }, [location]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div 
          ref={mapRef} 
          className="w-full h-64 bg-muted relative"
          data-testid="location-map"
        >
          {/* Map will be rendered here by the useEffect hook */}
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <span className="text-sm">Map of {location.name}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold flex items-center gap-1 mb-2">
            <MapPin className="h-4 w-4" />
            {location.name}
          </h3>
          <p className="text-sm text-muted-foreground">{location.address}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationMap;