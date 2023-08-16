import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ServerConfig } from "../../../global/config";
import { GET } from "../../../utils/API";
import Layout from "../../components/layout";
import { OppContext } from "../../context/OpportunityContext";
import { v4 as uuidv4 } from 'uuid';
import Full from '../../components/dashboard/full'
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
  const { setResponse, resp } = useContext(AuthContext);
  const { opp, setOpp } = useContext(OppContext);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true,     // Whether animation should happen only once
      easing: "ease-in-out", // Easing function for the animations
      // More configuration options can be added here
    });


    displayUserDetails();
    ListAllOpp();
  }, []);
  
  const displayUserDetails = () => {
    try {
      const SERVERTYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
      GET(SERVERTYPE, "/auth/fetchLogin")
        .then((response) => {
          console.log("user Detailsssss:", response.data);
          const uuid = uuidv4(); // Generate a UUID
  
          console.log("uuid:", uuid);
  
          sessionStorage.setItem("ClientIdentifier", JSON.stringify({
            name: response.data.name,
            uuid: uuid
          }));
          setResponse(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  

  console.log("res:", resp);

  const ListAllOpp = () => {
    try {
      const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;

      GET(SERVER_TYPE, "/Opportunity/OppList")
        .then((response) => {
          console.log("LIST OF ALL OPPORTUNITIES:-)", response.data.opportunities);
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
              Location: (
                <a
                  className="underline text-blue-600 hover:underline-offset-4"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(row.loc)}`}
                >
                  <svg viewBox="0 0 48 48" className="w-7 h-7 ml-3 fill-primary hover:fill-green-500" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                    <path d="M0 0h48v48h-48z" fill="none" />
                  </svg>
                </a>
              ),
              Area: row.area,
              "Unit Value": row.unit_val,
              Fund_Type:
                row.fundid === 2
                  ? "RBF"
                  : row.fundid && row.fundid === 3
                  ? "FRE"
                  : row.fundid && row.fundid === 4
                  ? "AL"
                  : row.fundid && row.fundid === 6
                  ? "ALP"
                  : row.fundid && row.fundid === 5
                  ? "UHNI"
                  : row.fundid,
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

  console.log("opportunity", opp);

  return (
    <div>
      <Layout>
      <div className="bg-green-600 text-white h-40 ">
        <h2 className="font-medium text-base ml-5 pt-7 " data-aos="fade-up">
          Welcome, {resp.name}{" "}
          <span role="img" aria-label="Smile emoji">
            😊 !
          </span>
        </h2>
        </div>
        <div className="-mt-28">
        <Full/>
       
        </div>

        {/* <main className="flex min-h-screen flex-col items-center justify-between p-24">
          
          <h1 className="font-bold text-3xl">Payout Calculation Dashboard</h1>
        </main> */}
      </Layout>
    </div>
  );
};

export default Dashboard;
