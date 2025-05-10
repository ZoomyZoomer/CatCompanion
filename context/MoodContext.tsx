import React, { createContext, useState, useContext } from 'react';

interface MoodContextValue {
  isPickingMood: boolean;
  setIsPickingMood: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoodContext = createContext<MoodContextValue | null>(null);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPickingMood, setIsPickingMood] = useState(false);
  return (
    <MoodContext.Provider value={{ isPickingMood, setIsPickingMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error('useMood must be inside a MoodProvider');
  return ctx;
};
