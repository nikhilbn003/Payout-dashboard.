import "@/styles/globals.css";
import "tailwindcss/tailwind.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { AuthProvider } from "../context/AuthContext";
import { EarningsDataProvider } from "../context/EarningContext";
import { PayoutDataProvider } from "../context/PayoutContext";
import { OppProvider } from "../context/OpportunityContext";
import { msalConfig } from "../../utils/azureconfig";

const msalInstance = new PublicClientApplication(msalConfig);

export default function App({ Component, pageProps }) {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <AuthProvider>
          <EarningsDataProvider>
            <PayoutDataProvider>
              <OppProvider>
                <Component {...pageProps} />
              </OppProvider>
            </PayoutDataProvider>
          </EarningsDataProvider>
        </AuthProvider>
      </MsalProvider>
    </>
  );
}
