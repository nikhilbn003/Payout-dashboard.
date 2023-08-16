import { GET } from "../../../../utils/API";
import { ServerConfig } from "../../../../global/config";

const FetchEarn = async (req, res) => {
  try {
    const { method } = req;

    if (method === "GET") {
      const accessToken = req.cookies.accessToken;

      const token = `Bearer ${accessToken}`;

      const SERVER_TYPE = ServerConfig.SERVER_TYPE.EXTERNAL.TYPE;

      const response = await GET(
        SERVER_TYPE,
        "/earnings/earnings",
        token,
        true
      );
      console.log("resp:", response.data.data);
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

export default FetchEarn;
