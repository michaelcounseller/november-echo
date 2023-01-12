import React, { useContext, useState } from "react";
const IDContext = React.createContext();
const IDUpdateContext = React.createContext();

export function useCounter() {
  return useContext(IDContext);
}

export function useCounterUpdate() {
  return useContext(IDUpdateContext);
}

export function IDProvider ({ children }) {
  const [counter, setCounter] = useState(0);

  function handleCounter() {
    setCounter((oldCount) => oldCount + 1);
  }
  
  return (
    <IDContext.Provider value={counter}>
      <IDUpdateContext value={handleCounter}>{children}</IDUpdateContext>
    </IDContext.Provider>
  );
};


