// import React, { createContext, useContext, useState, ReactNode } from "react";

// // Define the shape of the location and filters data
// // interface FilterContextType {
// //   location: { state: string; city: string };
// //   filters: { stayTypes: string[]; priceRange: [number, number]; amenities: string[] };
// //   setLocation: (state: string, city: string) => void;
// //   setFilters: (filters: any) => void;
// // }


// // BEFORE:
// // AFTER:
// interface FilterContextType {
//   location: { state: string; city: string };
//   filters: { stayTypes: string[]; priceRange: number[]; amenities: string[] };
//   // setLocation now takes an object { state, city }
//   setLocation: (loc: { state: string; city: string }) => void;
//   setFilters: (filters: any) => void;
// }



// const FilterContext = createContext<FilterContextType | undefined>(undefined);

// export const FilterProvider = ({ children }: { children: ReactNode }) => {
//   const [location, setLocationState] = useState({ state: "", city: "" });
//   const [filters, setFiltersState] = useState({
//     stayTypes: [],
//     priceRange: [0, 20000],
//     amenities: [],
//   });

//   // Update location and preserve filters
//   // const setLocation = (state: string, city: string) => {
//   //   setLocationState((prevLocation) => ({
//   //     ...prevLocation,
//   //     state,
//   //     city,
//   //   }));
//   // };


//   const setLocation = ({ state, city }: { state: string; city: string }) => {
//     console.log("Updating location to => ", state, city); // Log to confirm
//     setLocationState({ state, city });  
//   };
  


//   // const setLocation = (newState: string, newCity: string) => {
//   //   console.log("Updating location => ", newState, newCity);
//   //   setLocationState((prevLocation) => ({
//   //     ...prevLocation,
//   //     state: newState,
//   //     city: newCity,
//   //   }));
//   // };
  

//   // Update filters and preserve location
//   const setFilters = (newFilters: any) => {
//     setFiltersState((prevFilters) => ({
//       ...prevFilters,
//       ...newFilters, // Merge the new filters with the previous ones
//     }));
//   };

//   return (
//     <FilterContext.Provider value={{ location, filters, setLocation, setFilters }}>
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export const useFilter = () => {
//   const context = useContext(FilterContext);
//   if (!context) {
//     throw new Error("useFilter must be used within a FilterProvider");
//   }
//   return context;
// };





// new code

// locationcontext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
  location: { state: string; city: string };
  filters: {
    stayTypes: string[];
    priceRange: number[];
    amenities: string[];
  };
  setLocation: (loc: { state: string; city: string }) => void;
  setFilters: (newFilters: any) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState({ state: "", city: "" });
  const [filters, setFiltersState] = useState({
    stayTypes: [],
    priceRange: [0, 20000],
    amenities: [],
  });

  const setLocation = ({ state, city }: { state: string; city: string }) => {
    console.log("Updating location => ", state, city);
    setLocationState({ state, city });
  };

  // const setFilters = (newFilters: any) => {
  //   setFiltersState((prevFilters) => ({
  //     ...prevFilters,
  //     ...newFilters,
  //   }));
  // };

  // const setLocation = ({ state, city }: { state: string; city: string }) => {
  //   console.log("Location context updated:", { state, city });
  //   setLocationState({ state, city });
  // };
  
  // const setFilters = (newFilters: any) => {
  //   console.log("Filters context updated:", newFilters);
  //   setFiltersState((prevFilters) => ({
  //     ...prevFilters,
  //     ...newFilters,
  //   }));
  // };
  
  const setFilters = (newFilters: any) => {
    // Only update if filters have changed
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      console.log("Filters context updated:", newFilters);
      setFiltersState((prevFilters) => ({
        ...prevFilters,
        ...newFilters,
      }));
    }
  };
  

  return (
    <FilterContext.Provider value={{ location, filters, setLocation, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
