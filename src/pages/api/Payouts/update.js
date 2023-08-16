import { PATCH } from "../../../../utils/API";
import { ServerConfig } from "../../../../global/config";

const UpdatePayout = async (req, res) => {
  try {
    const { method } = req;

    const accessToken = req.cookies.accessToken;
    console.log("Accesstoken:>", accessToken);

    const token = `Bearer ${accessToken}`;
    console.log("BEARERtoken:", token);

    const {
      Earn_Month,
      Earn_Amount,
      ID,
      InvestId,
      Amount,
      Amount_Paid,
      Pdate,
      GST_Per,
      GST_Amount,
      TDS_Per,
      TDS_Amount,
      Principal,
      Consultation,
      Interest,
      Report_Path,
      Principal_Remaining,
    } = req.body;

    console.log("Full Req Body:", req.body);

    if (method === "POST") {
      const payload = {
        where: {
          id: ID,
          investid: InvestId,
        },
        payload: {
          earn_month: Earn_Month,
          earn_amount: Earn_Amount,
          amount: Amount,
          amount_paid: Amount_Paid,
          pdate: Pdate,
          gst_per: GST_Per,
          gst_amount: GST_Amount,
          tds_per: TDS_Per,
          tds_amount: TDS_Amount,
          principal: Principal,
          consultation: Consultation,
          interest: Interest,
          report_path: Report_Path,
          principal_remaining: Principal_Remaining,
        },
      };

      console.log("payload: ", payload);
      const SERVER_TYPE = ServerConfig.SERVER_TYPE.EXTERNAL.TYPE;

      const response = await PATCH(
        SERVER_TYPE,
        "/payoutData/updateOne",
        JSON.stringify(payload),
        token
      );

      console.log("api res:", response.data);

      return res.status(200).json(response.data);
    } else {
      console.log("PAYOUTAPI ERROR::", error);
      return res.status(400).json({
        message: "error",
      });
    }
  } catch (error) {
    res.json(error);
    res.status(400).end();
  }
};

export default UpdatePayout;
