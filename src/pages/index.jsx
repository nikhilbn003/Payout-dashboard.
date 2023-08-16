import { useContext, useEffect, useState } from "react";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { useRouter } from "next/router";
import bhive_logo from "../../public/bhive/logo_white.png";
import Image from "next/image";
import { TiVendorMicrosoft } from "react-icons/ti";
import { AuthContext } from "../context/AuthContext";
import { ServerConfig } from "../../global/config";
import { POST, GET } from "../../utils/API";
import Cookies from "js-cookie";

export default function Home() {
  const { instance } = useMsal();
  const [name, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  console.log("Name:", name);
  console.log("Email:", email);

  useEffect(() => {
    const handleRedirect = async () => {
      const response = await instance.handleRedirectPromise();
      if (response && response.account) {
        const name = response.account.name;
        const email = response.account.username;
        console.log("Name:", name);
        console.log("Email:", email);
        setUser(name);
        setEmail(email);
        sendToServer(name, email);
      }
    };

    // const sendToServer = async (name, email) => {
    //   try {
    //     const data = {
    //       data: {
    //         name: name,
    //         email: email,
    //       },
    //     };

    //     const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
    //     POST(SERVER_TYPE, "/auth/Login", JSON.stringify(data))
    //       .then((response) => {
    //         console.log("Auth sent", response);

    //         if (response.status === 200) {
    //           const { accessToken } = response.data.user;
    //           Cookies.set("accessToken", accessToken);
    //           router.push("/dashboard");
    //         } else {
    //           router.push("/");
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         // alert("Server error");
    //       });
    //   } catch (error) {
    //     console.log(error);
    //     alert("Server error");
    //   }
    // };


    const sendToServer = async (name, email) => {
      try {
        const data = {
          data: {
            name: name,
            email: email,
          },
        };
    
        const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
        POST(SERVER_TYPE, "/auth/Login", JSON.stringify(data))
          .then((response) => {
            console.log("Auth sent", response);
    
            if (response.status === 200) {
              const { accessToken } = response.data.user;
    
              
              if (Object.keys(response.data.user).length > 0) {
                Cookies.set("accessToken", accessToken);
                router.push("/dashboard");
              } else {
                alert("User not exist in the database")
                router.push("/");
              }
            } else {
              router.push("/");
            }
          })
          .catch((error) => {
            console.log(error);
            // alert("Server error");
          });
      } catch (error) {
        console.log(error);
        alert("Server error");
      }
    };

    handleRedirect();
  }, []);

  const handleLogin = async () => {
    try {
      const loginRequest = {
        scopes: ["openid", "profile", "User.Read"],
        prompt: "select_account",
      };
      instance.loginRedirect(loginRequest);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Name:", name);
  console.log("Email:", email);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 sm:flex h-screen">
          <div className="flex items-center sm:mx-auto">
            <div className="flex flex-col ">
              <h2 className="font-semibold text-3xl pl-12 mb-4">
                {" "}
                Get Started{" "}
              </h2>
              <p className="font-medium text-base pl-7">
                {" "}
                Login Using company mail to{" "}
              </p>
              <p className="font-medium text-base pl-24 mb-9"> get started</p>
              <button
                onClick={handleLogin}
                className="w-64  py-2 px-4 font-medium text-black flex gap-10 rounded-full border-2 border-green-500 hover:text-green-500 shadow-lg"
              >
                <TiVendorMicrosoft className="text-2xl " /> Login with Microsoft
              </button>
            </div>
          </div>

          <div className="sm:hidden items-center lg:flex md:flex bg-black relative">
            <div className="flex flex-col items-center w-full">
              <Image src={bhive_logo} alt="Login Image" className="w-3/4" />

              <div className="flex flex-col items-center gap-y-1 w-full">
                <h1 className="text-white mt-10 ">
                  India's largest and most comprehensive platform for
                </h1>

                <h1 className="text-white">
                  commercial real estate rental solutions,driven by a
                </h1>

                <h1 className="text-white">customer centric mindset</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

