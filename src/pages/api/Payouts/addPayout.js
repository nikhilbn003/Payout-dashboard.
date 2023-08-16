import { POST } from "../../../../utils/API";
import { ServerConfig } from "../../../../global/config";

const AddPayout = async (req, res) => {
  try {
    const { method } = req;

    const accessToken = req.cookies.accessToken;
    console.log("Accesstoken:>", accessToken);

    const token = `Bearer ${accessToken}`;
    console.log("BEARERtoken:", token);

    const {
      earn_month,
      earn_amount,
      id,
      investid,
      amount,
      amount_paid,
      pdate,
      gst_per,
      gst_amount,
      tds_per,
      tds_amount,
      principal,
      consultation,
      interest,
      report_path,
      principal_remaining,
    } = req.body;


    console.log("resss:",req.body);

    if (method == "POST") {
      const payload = {
        id: id,
        investid: investid,
        earn_month: earn_month,
        earn_amount: earn_amount,
        amount: amount,
        amount_paid: amount_paid,
        pdate: pdate,
        gst_per: gst_per,
        gst_amount: gst_amount,
        tds_per: tds_per,
        tds_amount: tds_amount,
        principal: principal,
        consultation: consultation,
        interest: interest,
        report_path: report_path,
        principal_remaining: principal_remaining,
      };

      const SERVER_TYPE = ServerConfig.SERVER_TYPE.EXTERNAL.TYPE;

      console.log("payload: ", payload);

      const response = await POST(
        SERVER_TYPE,
        "/payoutData/addOne",
        JSON.stringify(payload),
        token
      );

      console.log("api res", response.data);

      return res.status(200).json(response.data);
    } else {
      return "error";
    }
  } catch (error) {
    res.json(error);
    console.log("PAYOUTAPI ERROR::", error);
    res.status(400).end();
  }
};

export default AddPayout;

// "status":status,

// "utr_no":utr_no,

// "payment_due":payment_due,
// "to_be_paid_till_date":to_be_paid_till_date,
// "paid_till_date":paid_till_date,

// "collections_advance":collections_advance,
// "adjusted_collections":adjusted_collections,
// "gen_info":gen_info
