import { POST } from "../../../../utils/API";
import { ServerConfig } from "../../../../global/config";

const FetchYield = async (req, res) => {
  try {
    const { method } = req;
    
    console.log("resss:",req.body);
    
    if (method === "POST") {
      const accessToken = req.cookies.accessToken;
      console.log("acess", accessToken);

      const token = `Bearer ${accessToken}`;
      console.log("token:", token);
      
      const payload = req.body;

      const SERVER_TYPE = ServerConfig.SERVER_TYPE.EXTERNAL.TYPE;

      const response = await POST(
        SERVER_TYPE,
        "/yields/listAllYields",JSON.stringify(payload),
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

export default FetchYield;
