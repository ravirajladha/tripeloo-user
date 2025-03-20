
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the location data
interface LocationContextType {
  location: {
    state: string;
    city: string;
  };
  setLocation: (state: string, city: string) => void;
}

// Create the context
const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Provider component to wrap around your app
export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState({ state: "", city: "" });

  // Function to update location
  const updateLocation = (state: string, city: string) => {
    setLocation({ state, city });
  };

  return (
    <LocationContext.Provider value={{ location, setLocation: updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use the location context
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
