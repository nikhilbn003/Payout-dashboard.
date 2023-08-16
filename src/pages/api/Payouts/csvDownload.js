
import { POST } from "../../../../utils/API";
import { ServerConfig } from "../../../../global/config";

const FetchPay = async (req, res) => {
  try {
    const { method, query,body } = req;
   
   
  console.log("resss:",req.body);
    if (method === "POST") {
      const accessToken = req.cookies.accessToken;
      const token = `Bearer ${accessToken}`;

      console.log("body15",body);

      const payload = {
        where:body
      }
      

    const { pageNumber, pageSize } = query;

    console.log("pagesize",query);

      const SERVER_TYPE = ServerConfig.SERVER_TYPE.EXTERNAL.TYPE;
     
      console.log("PAYLOAD:24",payload);
     
       
      const response = await POST(
        SERVER_TYPE,
        `/payoutData/download?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        JSON.stringify(payload),
        token,
        true
      );

      console.log("Responsecsv:", response.data);

      return res.status(200).json(response.data);
    } else {
      return res.status(400).json({
        message: "Invalid method",
      });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default FetchPay;