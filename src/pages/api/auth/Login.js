import React from "react";
import { POST } from "../../../../utils/API";
import { ServerConfig } from "../../../../global/config";

const Login = async (req, res) => {
  try {
    const { method, body } = req;
   const { name, email } = body.data;
    if (method == "POST") {
      const payload = {
        data: {
          name: name,
          email: email,
        },
      };

      const SERVER_TYPE = ServerConfig.SERVER_TYPE.EXTERNAL.TYPE;

      const response = await POST(
        SERVER_TYPE,
        "/auth/login",
        JSON.stringify(payload)
      );

      const resp = response.data.data;

      res.status(200).json(resp);
      // const { accessToken } = response.data.data.user;
      // const token = accessToken;
    } else {
      res.status(500).json("Error");
    }
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
};

export default Login;
