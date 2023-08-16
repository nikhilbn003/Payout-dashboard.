import React, { createContext, useState, useEffect } from "react";
import { GET } from "../../utils/API";
import { ServerConfig } from "../../global/config";

const OppContext = createContext();

const OppProvider = ({ children }) => {
  const [opp, setOpp] = useState("");

  useEffect(() => {
    ListAllOpp();
  }, []);

  const ListAllOpp = () => {
    try {
      const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;

      GET(SERVER_TYPE, "/Opportunity/OppList")
        .then((response) => {
          console.log(
            "LIST OF ALL OPPORTUNITIES:-)",
            response.data.opportunities
          );
          return response.data.opportunities;
        })
        .then((jsonData) => {
          if (Array.isArray(jsonData)) {
            const modifiedData = jsonData.map((row) => ({
              "Property ID": row.propid,
              ID: row.id,
              Name: row.name,
              "Net IRR": row.net_irr,
              "Return Factor": row.return_factor,
              Location: row.loc,
              Area: row.area,
              "Unit Value": row.unit_val,
              "Dock Video": row.dock_video,
              "IM Doc": row.info_memor,
              Status: row.status === 1 ? "Open" : "Closed",
            }));
            setOpp(modifiedData);
          } else {
            console.error("Invalid data format:", jsonData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <OppContext.Provider
      value={{
        opp: opp,
        setOpp: setOpp,
      }}
    >
      {children}
    </OppContext.Provider>
  );
};

export { OppContext, OppProvider };
