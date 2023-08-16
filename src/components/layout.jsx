import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";

const Side = dynamic(() => import("./global/sideBar"), {
  // Disable server-side rendering for the Side component
  ssr: false,
});

const Layout = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check if the access token is present in the cookies
    const accessToken = Cookies.get("accessToken");
    const authenticated = !!accessToken;

    if (!authenticated) {
      // If the user is not authenticated, redirect to the '/' route
      router.push("/");
    } else {
      // Set the authentication state
      setIsAuthenticated(authenticated);
    }
  }, [router]);

  return (
    <>
      {isAuthenticated === null ? (
        <div>
          Loading...
          <div className="flex justify-center items-center h-64">
            <div className="loader ease-linear rounded-full border-4 border-t-8 border-green-400 h-16 w-16 animate-spin"></div>
          </div>
        </div>
      ) : (
        isAuthenticated && (
          <div className="flex lg:flex-col md:flex-col sm:flex-col ">
            <div className="flex flex-row">
              <aside className="self-start sticky top-0 col-span-1 z-10">
                <Side />
              </aside>
              <div
                className="flex-grow overflow-y-auto bg-gray-100"
                style={{ minHeight: "calc(100vh - 4rem)" }}
              >
                {children}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Layout;
