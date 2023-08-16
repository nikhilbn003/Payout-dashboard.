import { React, useEffect } from "react";
import FormComponent from "../../components/form/custForm";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { ServerConfig } from "../../../global/config";
import { POST } from "../../../utils/API";
import { usePayoutData } from "../../context/PayoutContext";
import { useState } from "react";

const EditPay = () => {
  const { getPayoutById } = usePayoutData();
  const router = useRouter();

  const [payout, setPayout] = useState(null);
  const { id } = router.query;
  console.log("payout data id:", id);

  useEffect(() => {
    if (id) {
      const fetchPayout = async () => {
        try {
          const payoutData = await getPayoutById(id);
          setPayout(payoutData);
        } catch (error) {
          console.error("Error fetching payout data:", error);
        }
      };

      fetchPayout();
    }
  }, [id]);

  console.log("Payout detailsss:", payout);

  // Convert encoded uri json string to object
  // const payout = JSON.parse(decodeURIComponent(item));

  // Define the validation schema for form fields (you can use Yup or any other validation library)
  

  const initialValues = payout
    ? {
        Earn_Month: payout.Earn_Month || "",
        Earn_Amount: payout.Earn_Amount || 0,
        ID: payout.ID || "",
        InvestId: payout.InvestId || "",
        // Status: payout.Status || "",
        Amount: payout.Amount || 0,
        Amount_Paid: payout.Amount_Paid || 0,
        Pdate: payout.Pdate,
        GST_Per: payout.GST_Per || 0,
        GST_Amount: payout.GST_Amount || 0,
        TDS_Per: payout.TDS_Per || 0,
        TDS_Amount: payout.TDS_Amount || 0,
        Principal: payout.Principal || 0,
        Consultation: payout.Consultation || 0,
        Interest: payout.Interest || 0,
        Report_Path: payout.Report_Path || "",
        Principal_Remaining: payout.Principal_Remaining || 0,
      }
    : {
        Earn_Month: "",
        Earn_Amount: "",
        ID: "",
        InvestId: "",
        // Status: "",
        Amount: "",
        Amount_Paid: "",
        Pdate: "",
        GST_Per: "",
        GST_Amount: "",
        TDS_Per: "",
        TDS_Amount: "",
        Principal: "",
        Consultation: "",
        Interest: "",
        Report_Path: "",
        Principal_Remaining: "",
      };

      const validationSchema = Yup.object({
        ID: Yup.string().required(" is required"),
        InvestId: Yup.string().required(" is required"),
        Earn_Month:Yup.string().required("Earn_Month is required"),
        Earn_Amount:Yup.string().required("Earn_Amount is required"),
        Amount:Yup.string().required("Amount is required"),
        Amount_Paid:Yup.string().required("Amount_Paid is required"),
        Payout_date:Yup.string().required("Payout_date is required"),
        GST_Per:Yup.string().required("GST_Per is required"),
        GST_Amount:Yup.string().required("GST_Amount is required"),
        TDS_Per:Yup.string().required("TDS_Per is required"),
        TDS_Amount:Yup.string().required("TDS_Amount is required"),
        Principal:Yup.string().required("Principal is required"),
        Consultation:Yup.string().required("Consultation is required"),
        Interest:Yup.string().required("Interest is required"),
        Report_Path:Yup.string().required("Report_Path is required"),
        Principal_Remaining:Yup.string().required("Principal_Remaining is required"),
      });

  // Handle form submission
  const onSubmit = (values) => {
    console.log("val", values);

    try {
      const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
      POST(SERVER_TYPE, "/Payouts/update", JSON.stringify(values))
        .then((response) => {
          if (response.status === 200) {
            console.log("ADDED DATA", response.data);
            router.push("/payouts");
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
    ID: {
      label: "ID",
      placeholder: "Id",
      type: "nonEditable",
    },
    InvestId: {
      label: "InvestId",
      placeholder: "InvestId",
      type: "nonEditable",
    },
    Earn_Month: {
      label: "Earn_Month",
      placeholder: " Earn Month",
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




  return (
    <>
      <Layout>
        <div className="mb-20 bg-white mt-16 mx-12 p-4 rounded-2xl">
          <h1 className="text-xl font-bold">Edit Payouts</h1>
        
          {payout ? (
            <FormComponent
              header="Edit Payouts"
              initialValues={initialValues}
              onSubmit={onSubmit}
              submitAs="Submit"
              labels={labels}
              validationSchema={validationSchema}
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

export default EditPay;
