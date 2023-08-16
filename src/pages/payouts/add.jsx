// AddPayoutPage.js
import * as Yup from "yup";
import React, { useState } from "react";
import { useRouter } from "next/router";
import FormComponent from "../../components/form/custForm";
import Layout from "../../components/layout";
import { ServerConfig } from "../../../global/config";
import { POST } from "../../../utils/API";
import moment from "moment";
import Modal from "../../components/form/modal";
import SuccessModal from "../../components/form/sucessModal";

const AddPayoutPage = () => {
  const router = useRouter();
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [initialValues, setInitialValues] = useState({
    Earn_Month: "",
    Earn_Amount: 0,
    ID: "",
    InvestId:0,
    Amount: 0,
    Amount_Paid: 0,
    Pdate: "",
    GST_Per: 0,
    GST_Amount: 0,
    TDS_Per: 0,
    TDS_Amount: 0,
    Principal: 0,
    Consultation: 0,
    Interest: 0,
    Report_Path: "",
    Principal_Remaining: 0,
  });

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleValueSubmit = (value) => {
    setInputValue(value);
    // Update the InvestId field in initialValues
    const tempValue = initialValues;
    tempValue['InvestId'] = value;
    console.log("tempvalue 48 ", tempValue);
    setInitialValues(tempValue);

    console.log("InitValue 51 ", initialValues);
  };

  console.log("modal value", inputValue);

  const validationSchema = Yup.object({
    // ID: Yup.string().required("ID Id is required"),
    InvestId:Yup.string().required("InvestId is required"),
    Earn_Month:Yup.string().required("Earn_Month is required"),
  });


  const handleSubmit = (values) => {
    console.log("VAL:", values);
    const { InvestId, Earn_Month } = values;
    const existingFormattedMonth = moment(Earn_Month).format("YYYY-MM"); 
    console.log("exist",existingFormattedMonth);
    const generatedId = `${InvestId}-${existingFormattedMonth}`; 
    console.log("Generated ID:", generatedId);
  
  
    const modifiedValue = {
      earn_month: existingFormattedMonth,
      earn_amount: values.Earn_Amount,
      investid: values.InvestId,
      amount: values.Amount,
      amount_paid: values.Amount_Paid,
      pdate: values.Pdate,
      gst_per: values.GST_Per,
      gst_amount: values.GST_Amount,
      tds_per: values.TDS_Per,
      tds_amount: values.TDS_Amount,
      principal: values.Principal,
      consultation: values.Consultation,
      interest: values.Interest,
      report_path: values.Report_Path,
      principal_remaining: values.Principal_Remaining,
    };

    const modifiedValues = {
      ...modifiedValue,
      id:generatedId

    }
  
    console.log("mod", modifiedValues);
    try {
      const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
      POST(SERVER_TYPE, "/Payouts/addPayout", JSON.stringify(modifiedValues))
        .then((response) => {
          console.log("Last Added Payout", response.data);
          if (response.status === 200) {
            // router.push("/payouts");
            setSuccessModalOpen(true);
          }
        })
        .catch((error) => {
          console.log("ISSUE", error);
        });
    } catch (error) {
      console.log("ERRORRRR", error);
    }
  };
  


  const labels = {
    // ID: {
    //   label: "ID",
    //   placeholder: "Id",
    //   type: "text",
    // },
    InvestId: {
      label: "InvestId",
      placeholder: "InvestId",
      type: "handleText",
      // value: inputValue,
    },
    Earn_Month: {
      label: "Earn_Month",
      placeholder: "Select Month",
      type: "month",
    },
    Earn_Amount: {
      label: "Earn_Amount",
      placeholder: "Earn Amount",
      type: "number",
    },
    Amount: {
      label: "Amount",
      placeholder: "Amount",
      type: "number",
    },

    Amount_Paid: {
      label: "Amount_Paid",
      placeholder: "Amount Paid",
      type: "number",
    },

    Pdate: {
      label: "Pdate",
      placeholder: "Payout Date",
      type: "date",
    },

    GST_Per: {
      label: "GST_Per",
      placeholder: "GST %",
      type: "number",
    },

    GST_Amount: {
      label: "GST_Amount",
      placeholder: "GST Amount",
      type: "number",
    },

    TDS_Per: {
      label: "TDS_Per",
      placeholder: "TDS %",
      type: "number",
    },

    TDS_Amount: {
      label: "TDS_Amount",
      placeholder: "TDS Amount",
      type: "number",
    },

    Principal: {
      label: "Principal",
      placeholder: "Principal",
      type: "number",
    },

    Consultation: {
      label: "Consultation",
      placeholder: "Consultation",
      type: "number",
    },

    Interest: {
      label: "Interest",
      placeholder: "Interest",
      type: "number",
    },

    Report_Path: {
      label: "Report_Path",
      placeholder: "Report Path",
      type: "text",
    },

    Principal_Remaining: {
      label: "Principal_Remaining",
      placeholder: "Principal Remaining",
      type: "number",
    },
  };

  labels["InvestId"].value = inputValue;

  return (
    <Layout>
      <div className="mx-auto ml-12 bg-white mb-20 mt-16 mr-12 p-4 rounded-2xl">
        <div className="ml-5">
          <h2 className="text-xl font-bold">Add Payouts</h2>
          <p className="mb-7">Add new Payouts</p>
        </div>
        <hr className="my-2 border-gray-400 w-full" />

        <FormComponent
          header="ADD Payouts"
          initialValues={initialValues}
          onSubmit={handleSubmit}
          labels={labels}
          validationSchema={validationSchema}
          handleTextClick={handleClick}
          submitAs="Submit"
        />
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onValueSubmit={handleValueSubmit}
          ariaHideApp={false} // To prevent accessibility issues when using Next.js
        ></Modal>
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          // formDetails={JSON.parse(formDetails)}
          title="Payout has been Added Sucessfully !"
          body="Payout Added"
          routePath="/payouts"
        />
      </div>
    </Layout>
  );
};

export default AddPayoutPage;