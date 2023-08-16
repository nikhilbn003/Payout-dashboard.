import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [resp, setResponse] = useState("");

  return (
    <AuthContext.Provider
      value={{
        resp: resp,
        setResponse: setResponse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
