import React, { useState, useContext } from "react";
import FormComponent from "../../components/form/custForm";
import * as Yup from "yup";
import SuccessModal from "../../components/form/sucessModal"; // Replace "path-to" with the correct path to your SuccessModal component
import { OppContext } from "../../context/OpportunityContext";
import Layout from "../../components/layout";
import { format, addMonths } from "date-fns";
import { parse } from "date-fns";
import { ServerConfig } from "../../../global/config";
import { POST } from "../../../utils/API";
import ReactDatePicker from "react-datepicker";
import moment from "moment/moment";
import "react-datepicker/dist/react-datepicker.css";


const PayCalculate = () => {
  const { opp } = useContext(OppContext);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [formDetails, setFormDetails] = useState(null);
  const [selectedDrop, setSelectedDrop] = useState(null);


  const initialValues = {
    OppID: selectedDrop,
    EarnMonth: "",
  };

  const validationSchema = Yup.object({
    OppID: Yup.string().required("Opportunity ID is required"),
    EarnMonth: Yup.string()
      .test(
        "valid-month",
        "Invalid month format",
        (value) => parse(value, "yyyy-MM", new Date()) instanceof Date
      )
      .required("EarnMonth is required"),
  });

  const onSubmit = (values) => {
    console.log("val", values);
    const formattedMonth = moment(values.EarnMonth).format("YYYY-MM");
    console.log("Formatted Month:", formattedMonth);
  
   
  
   
    const modifiedValues = {
      portid: values.OppID,
      earn_month: formattedMonth,
    };

    setFormDetails(JSON.stringify(modifiedValues));
  
    console.log("Modified data:", modifiedValues);
  
  
    try {
      const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
      POST(SERVER_TYPE, "/PayoutCalculate/calculate", JSON.stringify(modifiedValues))
        .then((response) => {
          console.log("API Response:", response);
          if (response.status === 200) {
            setSuccessModalOpen(true);
          }
        })
        .catch((error) => {
          console.log("API Error:", error);
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };
  

  const dropdownOptions = [
    { value: "", label: "Opportunity id" },
    ...(Array.isArray(opp)
      ? opp.map((item) => ({
          value: item.ID,
          label: item.Name,
        }))
      : []),
  ];

  const oppChange = (selectedOption) => {
    console.log("Selected option:", selectedOption);
    setSelectedDrop(selectedOption.value);
  };

  const labels = {
    OppID: {
      label: "OppID",
      placeholder: "Id",
      type: "dropdown",
      options: dropdownOptions,
    },
    EarnMonth: {
      label: "EarnMonth",
      placeholder: "EarnMonth",
      type: "month",
    },
  };

  const MonthInput = ({ fieldName, formik }) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Adding 1 to match the month format of the DatePicker
    const minDate = new Date(currentDate.getFullYear(), currentMonth - 1, 1); // Minimum date is the start of the current month
    const maxDate = new Date(currentDate.getFullYear(), currentMonth + 1, 1); // Maximum date is the end of the upcoming month

    return (
    
       <>
              <div className="flex flex-col">
                {formik.values[fieldName] ? null : (
                  <label htmlFor={fieldName} className="mb-1 ml-2 text-sm font-medium text-gray-700">
                    {labels[fieldName].label}
                  </label>
                )}
                <ReactDatePicker
                placeholderText="Select Month"
                  id={fieldName}
                  name={fieldName}
                  selected={formik.values[fieldName] ? new Date(formik.values[fieldName]) : null}
                  onChange={(date) => formik.setFieldValue(fieldName, date)}
                  onBlur={formik.handleBlur}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  minDate={minDate}
                  maxDate={maxDate}
                  className={`px-2.5 pb-2.5 pt-4 w-5/6 text text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer ${
                    formik.touched[fieldName] && formik.errors[fieldName]
                      ? "border-red-600"
                      : ""
              }`}
               />
               </div>
      </>
    );
  };

  return (
    <>
      <Layout>
        <div className="mx-12 bg-white mb-20 mt-16 p-4 rounded-2xl">
          <div className="ml-2">
            <h2 className="text-xl font-bold">Payout Calculation</h2>
            <p className="mb-7">Payout details</p>
            <hr/>
          </div>

          <FormComponent
            header="Payout detail's"
            initialValues={initialValues}
            onSubmit={onSubmit}
            labels={labels}
            validationSchema={validationSchema}
            dropdownOptions={dropdownOptions}
            dropdownOnChange={oppChange}
            submitAs="Calculate"
            btClassName="mt-60"
            customComponents={{ month: MonthInput }} 
          />
          <SuccessModal
            isOpen={isSuccessModalOpen}
            onClose={() => setSuccessModalOpen(false)}
            formDetails={JSON.parse(formDetails)}
            title="Payout has been Calculated !"
            body="Payout Calculated"
            routePath="/payouts"
          />
        </div>
      </Layout>
    </>
  );
};

export default PayCalculate;
