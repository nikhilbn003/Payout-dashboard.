import { POST } from "../../../../utils/API";
import { ServerConfig } from "../../../../global/config";


const SendPayoutById = async (req, res) => {
  try {
    const { method } = req;
    const accessToken = req.cookies.accessToken;
    console.log("acess", accessToken);

    const token = `Bearer ${accessToken}`;
    console.log("token:", token);

    const { portid, earn_month, id } = req.body;
    console.log("req: ", req.body);
    if (method === "POST") {
      const payload = {
        portid: portid,
        earn_month: earn_month,
        id: id,
      };

      const SERVER_TYPE = ServerConfig.SERVER_TYPE.EXTERNAL.TYPE;

      const response = await POST(
        SERVER_TYPE,
        "/payoutReportEmail/sendEmailPayoutIdOne",
        JSON.stringify(payload),
        token
      );
      console.log("resp:", response.data);
      return res.status(200).json(response.data);
    } else {
      return res.status(400).json({
        message: "error",
      });
    }
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
};

export default SendPayoutById;
