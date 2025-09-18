export interface Location {
  name: string;
  address: string;
  image: string;
  link: string;
}

export const locations: Location[] = [
  {
    name: "New York",
    address: "123 Business Avenue, Suite 500\nNew York, NY 10001",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    link: "#",
  },
  {
    name: "San Francisco",
    address: "456 Innovation Street\nSan Francisco, CA 94105",
    image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    link: "#",
  },
  {
    name: "Chicago",
    address: "789 Lakeview Tower\nChicago, IL 60601",
    image: "https://images.unsplash.com/photo-1549637642-90187f64f420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    link: "#",
  },
];
