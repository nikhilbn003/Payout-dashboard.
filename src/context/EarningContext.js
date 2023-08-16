import React, { createContext, useState, useContext } from "react";

const EarningsDataContext = createContext();

export const EarningsDataProvider = ({ children }) => {
  const [earningsData, setEarningsData] = useState([]);

  const setEarningsDataInContext = (data) => {
    setEarningsData(data);
  };

  const getEarningsData = () => {
    return earningsData;
  };

  const getEarningById = (ID) => {
    const item = earningsData.find((earnings) => earnings.ID === ID);
    return item || " ";
  };

  return (
    <EarningsDataContext.Provider
      value={{
        earningsData,
        setEarningsData: setEarningsDataInContext,
        getEarningsData,
        getEarningById,
      }}
    >
      {children}
    </EarningsDataContext.Provider>
  );
};

export const useEarningsData = () => useContext(EarningsDataContext);
