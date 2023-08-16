
const DevConfig = {
  CONFIG: "DEVELOPMENT",

  AZURE_CONFIG: {
    NEXT_PUBLIC_AZURE_CLIENT_ID: "d93c21be-acce-4eeb-9060-e351d84e7fec",
    NEXT_PUBLIC_AZURE_TENANT_ID:
      "https://login.microsoftonline.com/696e5350-ad97-4434-9554-59207481a1ed",
  },
  SERVER_TYPE: {
    INTERNAL: {
      TYPE: "INTERNAL",
      WEB_LINK: "http://localhost:3000",
      API_LINK: "http://localhost:3000/api",
    },
    EXTERNAL: {
      TYPE: "EXTERNAL",
      WEB_LINK: "https://brea.bhivealts.com",
      API_LINK: "https://brea.bhivealts.com/api/v1",
    },
  },
};

const StageConfig = {
  CONFIG: "STAGING",

  AZURE_CONFIG: {
    NEXT_PUBLIC_AZURE_CLIENT_ID: "d93c21be-acce-4eeb-9060-e351d84e7fec",
    NEXT_PUBLIC_AZURE_TENANT_ID:
      "https://login.microsoftonline.com/696e5350-ad97-4434-9554-59207481a1ed",
  },
  SERVER_TYPE: {
    INTERNAL: {
      TYPE: "INTERNAL",
      WEB_LINK: "http://127.0.0.1:3000",
      API_LINK: "http://127.0.0.1:3000/api",
    },
    EXTERNAL: {
      TYPE: "EXTERNAL",
      WEB_LINK: "https://app-stage.bhivealts.com",
      API_LINK: "https://brea.bhivealts.com/api/v1",
    },
  },
};

const ProdConfig = {
  CONFIG: "PRODUCTION",
 
  AZURE_CONFIG: {
    NEXT_PUBLIC_AZURE_CLIENT_ID: "d93c21be-acce-4eeb-9060-e351d84e7fec",
    NEXT_PUBLIC_AZURE_TENANT_ID:
      "https://login.microsoftonline.com/696e5350-ad97-4434-9554-59207481a1ed",
  },
  SERVER_TYPE: {
    INTERNAL: {
      TYPE: "INTERNAL",
      WEB_LINK: "https://brea-app.bhivealts.com/",
      API_LINK: "https://brea-app.bhivealts.com/api",
    },
    EXTERNAL: {
      TYPE: "EXTERNAL",
      WEB_LINK: "https://brea.bhivealts.com",
      API_LINK: "https://brea.bhivealts.com/api/v1",
    },
  },
};

const getServerConfig = (releaseConfig = releaseType.DEVELOPMENT) => {
  if (releaseConfig === releaseType.PRODUCTION) return ProdConfig;
  else if (releaseConfig === releaseType.STAGING) return StageConfig;
  else return DevConfig;
};

const releaseType = {
  PRODUCTION: "production",
  STAGING: "staging",
  DEVELOPMENT: "development",

};


export const ServerConfig = getServerConfig(releaseType.PRODUCTION);