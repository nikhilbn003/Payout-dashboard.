import { GET } from "../../../../utils/API";
import { ServerConfig } from "../../../../global/config";

const fetchLogin = async (req, res) => {
  try {
    const { method } = req;

    if (method === "GET") {
      const accessToken = req.cookies.accessToken;
      console.log("acess", accessToken);

      const token = `Bearer ${accessToken}`;
      console.log("token:", token);

      const SERVER_TYPE = ServerConfig.SERVER_TYPE.EXTERNAL.TYPE;

      const response = await GET(SERVER_TYPE, "/auth/whoami", token, true);
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

export default fetchLogin;
