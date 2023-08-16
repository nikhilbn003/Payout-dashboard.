import { POST } from "../../../../utils/API";
import { ServerConfig } from "../../../../global/config";


const GetInvestor = async (req, res) => {
  try {
    const { method } = req;
    const accessToken = req.cookies.accessToken;
    console.log("acess", accessToken);

    const token = `Bearer ${accessToken}`;
    console.log("token:", token);

    const { value } = req.body;
    console.log("req: ", req.body);
    if (method === "POST") {
      const payload = {
          data:{
            page: 0,
            pageSize: 10,
            search: value,
          }
      };

      const SERVER_TYPE = ServerConfig.SERVER_TYPE.EXTERNAL.TYPE;

      const response = await POST(
        SERVER_TYPE,
        "/investments/investor_investment",
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

export default GetInvestor;
