import React, { useContext } from "react";
import FormComponent from "../../components/form/custForm";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { ServerConfig } from "../../../global/config";
import { POST } from "../../../utils/API";
import { useState } from "react";
import { useEarningsData } from "../../context/EarningContext";
import { OppContext } from "../../context/OpportunityContext";
import moment from "moment";
import SuccessModal from "../../components/form/sucessModal";

const AddEarn = () => {
  const [selectedDrop, setSelectedDrop] = useState(null);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const { getEarningsData } = useEarningsData();
  const router = useRouter();
  const { opp } = useContext(OppContext);

  console.log("dataaaaa:", opp);
  const earningsData = getEarningsData();
  console.log("fetch", earningsData);

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

  const initialValues = {
    OppID: selectedDrop,
    Gross_Earn: 0,
    EarnMonth: "",
    Total_Earn: 0,
    Perf_fees: 0,
  };

  // Handle form submission
  const onSubmit = (values) => {
    console.log("val", values);

    const formattedMonth = moment(values.EarnMonth).format("YYYY-MM");
    console.log("Formatted Month:", formattedMonth);

    // Modify the form values based on the form labels
    const modifiedValues = {
      portid: values.OppID, // Use the label value instead of the original value
      earn_month: formattedMonth,
      gross_earn: values.Gross_Earn,
      total_earn: values.Total_Earn,
      perf_fees: values.Perf_fees,
    };

    // Send the modified form values
    try {
      const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
      POST(SERVER_TYPE, "/Earnings/add", JSON.stringify(modifiedValues))
        .then((response) => {
          console.log("ADDED", response.data);
          if (response.status === 200) {
            // alert("Earnings Added Successfully");
            setSuccessModalOpen(true);
            // router.push("/earnings");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // dropdown filter
  // const dropdownOptions = [
  //   { value: "", label: "Opportunity id" },
  //   ...Array.from(
  //     new Set(
  //       earningsData
  //         .filter((option) => option.Opportunity_Name.endsWith("RBF"))
  //         .map((option) => option.OppID)
  //     )
  //   ).map((OppID) => {
  //     const opportunity = earningsData.find((option) => option.OppID === OppID);
  //     console.log("opp", opportunity);
  //     return {
  //       value: opportunity.OppID,
  //       label: opportunity.Opportunity_Name,
  //     };
  //   }),
  // ];

  const dropdownOptions = [
    { value: "", label: "Opportunity id" },
    ...(Array.isArray(opp)
      ? opp
          .filter((item) => item.Name && item.Name.endsWith("RBF"))
          .map((item) => ({
            value: item.ID,
            label: item.Name,
          }))
      : []),
  ];

  console.log("name", dropdownOptions);

  const oppChange = (selectedOption) => {
    console.log("Selected option:", selectedOption);
    setSelectedDrop(selectedOption.value);
  };

  // Define labels for form fields
  const labels = {
    OppID: {
      label: "Opportunity",
      placeholder: "Id",
      type: "dropdown",
      options: dropdownOptions,
    },
    Gross_Earn: {
      label: "Gross Earnings",
      placeholder: "Gross Earnings",
      type: "number",
    },
    EarnMonth: {
      label: "Earn Month",
      placeholder: " EarnMonth",
      type: "month",
    },
    Total_Earn: {
      label: "Total Earnings",
      placeholder: "Total Earnings",
      type: "number",
    },
    Perf_fees: {
      label: "Collection Advance",
      placeholder: "Perf_fees",
      type: "number",
    },
  };

  return (
    <>
      <Layout>
        <div className="mx-auto ml-12 bg-white mb-20 mt-16 mr-12 p-4 rounded-2xl">
          <div className="ml-5">
            <h2 className="text-xl font-bold"> Add Earnings </h2>
            <p className="mb-7">Add Earnings</p>
          </div>
          <hr />

          <FormComponent
            header="ADD Earnings"
            initialValues={initialValues}
            onSubmit={onSubmit}
            labels={labels}
            validationSchema={validationSchema}
            dropdownOptions={dropdownOptions}
            dropdownOnChange={oppChange}
            submitAs="Submit"
            btClassName="mt-20"
          />
          <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setSuccessModalOpen(false)}
         
          title="Earnings has been Added Suceessfully !"
          body="Earnings Added"
          routePath="/earnings"
          />
        </div>
      </Layout>
    </>
  );
};

export default AddEarn;
