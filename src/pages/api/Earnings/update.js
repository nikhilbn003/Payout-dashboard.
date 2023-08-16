import { PATCH } from "../../../../utils/API";
import { ServerConfig } from "../../../../global/config";

const UpdateEarn = async (req, res) => {
  try {
    const { method } = req;
    const accessToken = req.cookies.accessToken;
    console.log("acess", accessToken);

    const token = `Bearer ${accessToken}`;
    console.log("token:", token);

    const { OppID, EarnMonth, Gross_Earn, Total_Earn, Perf_fees } = req.body;
    console.log("full req: ", req.body);
    if (method === "POST") {
      const payload = {
        where: {
          id: OppID,
        },
        payload: {
          gross_earn: Gross_Earn,
          earn_month: EarnMonth,
          perf_fees: Perf_fees,
          total_earn: Total_Earn,
        },
      };

      console.log("payload:", payload);

      const SERVER_TYPE = ServerConfig.SERVER_TYPE.EXTERNAL.TYPE;

      const response = await PATCH(
        SERVER_TYPE,
        "/earnings/earnings",
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

export default UpdateEarn;
