"use client";
import React from "react";

interface ContextProps {
  children: React.ReactNode;
}

interface ItemContextType {
  item: number;
  setItem: React.Dispatch<React.SetStateAction<number>>;
}

const ItemContext = React.createContext<any>(undefined);

const ItemProvider: React.FC<ContextProps> = ({ children }) => {
  const [item, setItem] = React.useState<number>(0);

  return (
    <ItemContext.Provider value={{ item, setItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;

export const useItem = () => {
  return React.useContext(ItemContext);
};
