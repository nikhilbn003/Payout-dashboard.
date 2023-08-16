import React, { useState, useContext } from "react";
import FormComponent from "../../components/form/custForm";
import * as Yup from "yup";
import SuccessModal from "../../components/form/sucessModal";
import { OppContext } from "../../context/OpportunityContext";
import Layout from "../../components/layout";
import { parse } from "date-fns";
import { ServerConfig } from "../../../global/config";
import { POST } from "../../../utils/API";
import moment from "moment/moment";
import ReactDatePicker from "react-datepicker";

const SendPay = () => {
  const { opp } = useContext(OppContext);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [formDetails, setFormDetails] = useState(null);
  const [selectedDrop, setSelectedDrop] = useState(null);

  const initialValues = {
    OppID: selectedDrop,
    EarnMonth: "",
    PayoutID: "",
  };

  const validationSchema = Yup.object({
    EarnMonth: Yup.string()
      .test(
        "valid-month",
        "Invalid month format",
        (value) => parse(value, "yyyy-MM", new Date()) instanceof Date
      )
      .required("EarnMonth is required"),
  });

  const onSubmit = async (values) => {
    try {
      setFormDetails(null); // Clear previous form details
      console.log("val", values);
      const formattedMonth = moment(values.EarnMonth).format("YYYY-MM");

      let endpoint = "";
      let modifiedValues = {};

      if (values.PayoutID) {
        endpoint = "/SendPayout/sendPayoutById";
        modifiedValues = {
          portid: values.OppID,
          earn_month: formattedMonth,
          id: values.PayoutID,
        };
      } else if (values.OppID) {
        endpoint = "/SendPayout/sendPayoutByOpp";
        modifiedValues = {
          portid: values.OppID,
          earn_month: formattedMonth,
        };
      } else {
        endpoint = "/SendPayout/sendPayoutByMonth";
        modifiedValues = {
          earn_month: formattedMonth,
        };
      }

      const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
      const response = await POST(SERVER_TYPE, endpoint, JSON.stringify(modifiedValues));

      if (response.status === 200) {
        setSuccessModalOpen(true);
        setFormDetails(JSON.stringify(modifiedValues)); // Store JSON string in formDetails
      }
    } catch (error) {
      console.log(error);
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
    PayoutID: {
      label: "Payout Id",
      placeholder: "Payout Id",
      type: "text",
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
              formik.touched[fieldName] && formik.errors[fieldName] ? "border-red-600" : ""
            }`}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <Layout>
        <div className="mx-auto ml-12 bg-white mb-20 mt-16 mr-12 p-4 rounded-2xl">
          <div className="ml-5">
            <h2 className="text-xl font-bold">Send Payout Report </h2>
            <p className="mb-7"> Send Report </p>
            <hr />
          </div>

          <FormComponent
            header="Payout detail's"
            initialValues={initialValues}
            onSubmit={onSubmit}
            labels={labels}
            validationSchema={validationSchema}
            dropdownOptions={dropdownOptions}
            dropdownOnChange={oppChange}
            submitAs="Send Report"
            btClassName="mt-48"
            customComponents={{ month: MonthInput }} // Specify the custom component for the "month" type
          />

          <SuccessModal
            isOpen={isSuccessModalOpen}
            onClose={() => setSuccessModalOpen(false)}
            formDetails={formDetails ? JSON.parse(formDetails) : null}
            title="Payout Report has been sent !"
            body="Report Sent"
            routePath="/payouts"
          />
        </div>
      </Layout>
    </>
  );
};

export default SendPay;
