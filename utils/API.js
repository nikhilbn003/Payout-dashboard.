import axios from "axios";
import { ServerConfig } from "../global/config";

let getHeader = (token = null || "", type = "application/json") => ({
  "Content-Type": type,
  Authorization: token,
  "Access-Control-Allow-Origin": "*",
  "x-user-data": token ? token : null,
  "x-Client-Identifier": getClientIdentifier(),
});



const getClientIdentifier = async () => {
  try {
    const data = await sessionStorage.getItem("ClientIdentifier");
    if (!data) {
      return 'init';
    }
    console.log("data19", data);
    return data;
  } catch (error) {
    console.log(error);
    return 'init';
  }
};




const getConfig = (method, url, header, form) =>
  method === "POST"
    ? {
        method: method,
        url: url,
        headers: header,
        data: form,
      }
    : method === "PATCH"
    ? {
        method: method,
        url: url,
        headers: header,
        data: form,
      }
    : {
        method: method,
        url: url,
        headers: header,
      };

export const GET = async (
  type,
  path,
  addToken = false,
  headerRequired = false,
  body = {}
) => {
  let url = ``;

  if (type == ServerConfig.SERVER_TYPE.EXTERNAL.TYPE) {
    url = `${ServerConfig.SERVER_TYPE.EXTERNAL.API_LINK}${path}`;
  } else {
    url = `${ServerConfig.SERVER_TYPE.INTERNAL.API_LINK}${path}`;
  }

  console.log("urls", url);
  let token = addToken != false ? addToken : "";
  console.log("ttt", token);

  let config = getConfig("GET", url, getHeader(token), null,body);

  console.log("header for get: ", config);

  // let res = await axios(config).catch((reason) => {
  //   console.log(path, reason);
  // });

  // if (headerRequired) return res;
  // else return res.data;
  try {
    let res = await axios(config);
    if (headerRequired) {
      return res;
    } else {
      return res.data;
    }
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code outside the 2xx range
      console.log("Server responded with an error:", error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.log("No response received from the server");
    } else {
      // Something happened in setting up the request that triggered an error
      console.log("Error while sending the request:", error.message);
    }
    console.log("Server is not available");
    return "no server";
  }
};

export const POST = async (
  type,
  path,
  form,
  addToken = false,
  hideError = false
) => {
  let url = ``;

  if (type == ServerConfig.SERVER_TYPE.EXTERNAL.TYPE) {
    url = `${ServerConfig.SERVER_TYPE.EXTERNAL.API_LINK}${path}`;
  } else {
    url = `${ServerConfig.SERVER_TYPE.INTERNAL.API_LINK}${path}`;
  }

  console.log("urls", url);
  console.log(" INSIDE POST ", addToken);

  let config = getConfig("POST", url, getHeader(addToken), form);
  console.log(" CONFIG ", config);

  

  try {
    const res = await axios(config);
    // console.log("response",res);
    console.log("path: ", path, "POST RES: ", res.data);
    return res;
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code outside the 2xx range
      console.log("Server responded with an error:", error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.log("No response received from the server");
    } else {
      // Something happened in setting up the request that triggered an error
      console.log("Error while sending the request:", error.message);
    }
    console.log("Server is not available");
    return "no server";
  }
};

export const PATCH = async (type, path, form, addToken = false) => {
  let url = ``;

  if (type == ServerConfig.SERVER_TYPE.EXTERNAL.TYPE) {
    url = `${ServerConfig.SERVER_TYPE.EXTERNAL.API_LINK}${path}`;
  } else {
    url = `${ServerConfig.SERVER_TYPE.INTERNAL.API_LINK}${path}`;
  }
  console.log("urls:", url);
  console.log(" INSIDE PATCH:", addToken);

  let config = getConfig("PATCH", url, getHeader(addToken), form);
  console.log(" CONFIG ", config);

  try {
    const res = await axios(config);

    return res;
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code outside the 2xx range
      console.log("Server responded with an error:", error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.log("No response received from the server");
    } else {
      // Something happened in setting up the request that triggered an error
      console.log("Error while sending the request:", error.message);
    }
    console.log("Server is not available");
    return "no server";
  }
};

module.exports = {
  GET: GET,
  POST: POST,
  PATCH: PATCH,
};
