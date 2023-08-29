
const DevConfig = {
  CONFIG: "DEVELOPMENT",

  AZURE_CONFIG: {
    NEXT_PUBLIC_AZURE_CLIENT_ID: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID,
    NEXT_PUBLIC_AZURE_TENANT_ID:process.env.NEXT_PUBLIC_AZURE_TENANT_ID 
   },
  SERVER_TYPE: {
    INTERNAL: {
      TYPE: "INTERNAL",
      WEB_LINK: process.env.WEB_LINK_DEV_INTERNAL,
      API_LINK: process.env.API_LINK_DEV_INTERNAL,
    },
    EXTERNAL: {
      TYPE: "EXTERNAL",
      WEB_LINK: process.env.WEB_LINK_DEV_EXTERNAL,
      API_LINK: process.env.API_LINK_DEV_EXTERNAL,
    },
  },
};

const StageConfig = {
  CONFIG: "STAGING",

  AZURE_CONFIG: {
    NEXT_PUBLIC_AZURE_CLIENT_ID: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID,
    NEXT_PUBLIC_AZURE_TENANT_ID:process.env.NEXT_PUBLIC_AZURE_TENANT_ID 
  },
  SERVER_TYPE: {
    INTERNAL: {
      TYPE: "INTERNAL",
      WEB_LINK: process.env.WEB_LINK_STAGE_INTERNAL,
      API_LINK: process.env.API_LINK_STAGE_INTERNAL,
    },
    EXTERNAL: {
      TYPE: "EXTERNAL",
      WEB_LINK: process.env.WEB_LINK_STAGE_EXTERNAL,
      API_LINK: process.env.API_LINK_STAGE_EXTERNAL,
    },
  },
};

const ProdConfig = {
  CONFIG: "PRODUCTION",
 
  AZURE_CONFIG: {
    NEXT_PUBLIC_AZURE_CLIENT_ID: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID,
    NEXT_PUBLIC_AZURE_TENANT_ID:process.env.NEXT_PUBLIC_AZURE_TENANT_ID 
  },
  SERVER_TYPE: {
    INTERNAL: {
      TYPE: "INTERNAL",
      WEB_LINK: process.env.WEB_LINK_PROD_INTERNAL,
      API_LINK: process.env.API_LINK_PROD_INTERNAL,
    },
    EXTERNAL: {
      TYPE: "EXTERNAL",
      WEB_LINK: process.env.WEB_LINK_PROD_EXTERNAL,
      API_LINK: process.env.API_LINK_PROD_EXTERNAL,
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