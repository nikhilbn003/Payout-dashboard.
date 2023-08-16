import { LogLevel } from "@azure/msal-browser";
import { ServerConfig } from "../global/config";

export const msalConfig = {
  auth: {
    clientId: ServerConfig.AZURE_CONFIG.NEXT_PUBLIC_AZURE_CLIENT_ID,
    authority: ServerConfig.AZURE_CONFIG.NEXT_PUBLIC_AZURE_TENANT_ID,
    redirectUri: ServerConfig.SERVER_TYPE.INTERNAL.WEB_LINK,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
    accessTokenExpirationOffsetInSeconds: 200, 
  },

  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
