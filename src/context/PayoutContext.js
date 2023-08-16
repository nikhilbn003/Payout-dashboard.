import React, { createContext, useState, useContext } from "react";

const PayoutDataContext = createContext();

export const PayoutDataProvider = ({ children }) => {
  const [payoutData, setPayoutData] = useState([]);

  const setPayoutDataInContext = (data) => {
    setPayoutData(data);
  };

  const getPayoutData = () => {
    return payoutData;
  };

  const getPayoutById = (ID) => {
    const item = payoutData.find((payout) => payout.ID === ID);
    return item || " ";
  };

  return (
    <PayoutDataContext.Provider
      value={{
        payoutData,
        setPayoutData: setPayoutDataInContext,
        getPayoutData,
        getPayoutById,
      }}
    >
      {children}
    </PayoutDataContext.Provider>
  );
};

export const usePayoutData = () => useContext(PayoutDataContext);
