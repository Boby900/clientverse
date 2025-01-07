import React, { createContext, useContext, useState } from "react";

interface BadgeContextType {
  isNew: boolean; // A flag to indicate if there's a new entry
  setNew: () => void; // Function to set the "New" state
  reset: () => void;
}

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

export const BadgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNew, setIsNew] = useState(false);  // Flag to track if there's a new entry
  const reset = () => setIsNew(false); // Resets the "New" flag to false
  const setNew = () => setIsNew(true);  // Sets the "New" flag to true when a new entry is added

  return (
    <BadgeContext.Provider value={{ isNew, setNew, reset }}>
      {children}
    </BadgeContext.Provider>
  );
};

export const useBadge = (): BadgeContextType => {
  const context = useContext(BadgeContext);
  if (!context) {
    throw new Error("useBadge must be used within a BadgeProvider");
  }
  return context;
};
