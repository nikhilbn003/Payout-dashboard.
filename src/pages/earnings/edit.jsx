import React from "react";
import FormComponent from "../../components/form/custForm";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { ServerConfig } from "../../../global/config";
import { POST } from "../../../utils/API";
import { useEffect, useState } from "react";
import { useEarningsData } from "../../context/EarningContext";
import Layout from "../../components/layout";

const EditEarn = () => {
  const { getEarningById } = useEarningsData();
  const [earning, setEarning] = useState(null);

  const router = useRouter();
  const { id } = router.query; // Retrieve the 'id' query parameter

  console.log("Earnings ID:", id);

  useEffect(() => {
    if (id) {
      // Call the function to fetch the data based on the ID
      const fetchEarning = async () => {
        try {
          const earningData = await getEarningById(id);
          setEarning(earningData);
        } catch (error) {
          console.error("Error fetching earning data:", error);
        }
      };

      fetchEarning();
    }
  }, [id]);

  console.log("Earning details:", earning);

  // Define the validation schema for form fields (you can use Yup or any other validation library)
  const validationSchema = Yup.object({
    OppID: Yup.string().required("Opp Id is required"),
    EarnMonth: Yup.string().required("EarnMonth is required"),
    Gross_Earn: Yup.number()
      .required(" Gross_Earn is required")
      .min(0, "Gross Earn must be a positive value"),
    Total_Earn: Yup.number()
      .required("  Total_Earn is required")
      .min(0, "Total_Earn must be a positive value"),
    Perf_fees: Yup.number()
      .required("  Perf_fees is required")
      .min(0, "Total_Earn must be a positive value"),
  });

  // initalize the value
  const initialValues = earning
    ? {
        OppID: earning.OppID || "",
        Gross_Earn: earning['Gross Earn'] || 0,
        EarnMonth: earning['Earn Month'] || "",
        Total_Earn: earning['Total Earn'] || 0,
        Perf_fees: earning['Col Advance'] || 0,
      }
    : {
        OppID: "",
        Gross_Earn: 0,
        EarnMonth: "",
        Total_Earn: 0,
        Perf_fees: 0,
      };

  // Handle form submission
  const onSubmit = (values) => {
    console.log("val", values);
    try {
      const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
      POST(SERVER_TYPE, "/Earnings/update", JSON.stringify(values))
        .then((response) => {
          console.log("ADDED", response.data);
          if (response.status === 200) {
            router.push("/earnings");
            alert("edited sucessfully")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Define labels for form fields
  const labels = {
    OppID: {
      label: "OppID",
      placeholder: "Id",
      type: "nonEditable",
    },
    EarnMonth: {
      label: "EarnMonth",
      placeholder: " EarnMonth",
      type: "nonEditable",
    },
    Gross_Earn: {
      label: "Gross_Earn",
      placeholder: "gross earn",
      type: "number",
    },
    Total_Earn: {
      label: "Total_Earn",
      placeholder: "Total_Earn",
      type: "number",
    },
    Perf_fees: {
      label: "Perf_fees",
      placeholder: "Perf_fees",
      type: "number",
    },
  };

  return (
    <>
      <Layout>
        <div className="mx-auto ml-12 bg-white mb-20 mt-16 mr-12 p-4 rounded-2xl">
          <div className="ml-5">
            <h2 className="text-xl font-bold"> Edit Earnings </h2>
            <p className="mb-7">Edit Earnings</p>
          </div>
          <hr/>
          {earning ? (
            <FormComponent
              header="Earnings Details"
              initialValues={initialValues}
              onSubmit={onSubmit}
              labels={labels}
              validationSchema={validationSchema}
              submitAs="Submit"
              btClassName="mt-20"
            />
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="loader ease-linear rounded-full border-4 border-t-8 border-green-400 h-16 w-16 animate-spin"></div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default EditEarn;
