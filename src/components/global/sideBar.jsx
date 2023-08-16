import { useState, useEffect } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import FaHandHoldingUsd from "../sideBarIcons/FaHandHoldingUsdIcon";
import TbHomeStats from "../sideBarIcons/TbHomeStatsIcon";
import GiCash from "../sideBarIcons/GiCashIcon";
import FaChartBar from "../sideBarIcons/FaChartBarIcon";
import Image from "next/image";
import bhive_logo from "../../../public/bhive/logo_white.png";
import B_logo from "../../../public/bhive/bhive_logo.png";
import Link from "next/link";
import MdLogout from "../sideBarIcons/MdLogoutIcon";
import { useRouter } from "next/router";
import { useMsal } from "@azure/msal-react";
import Cookies from "js-cookie";
import { useIdleTimer } from "react-idle-timer";

const Side = () => {
  const [open, setOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const { instance } = useMsal();
  const router = useRouter();

  const handleLogout = () => {
    instance.logout();
    Cookies.remove("accessToken");
    router.push("/");
    // window.location.href = "/";
  };

  // Function to handle new message arrival
  const handleNewMessage = () => {
    setMessageCount((prevCount) => prevCount + 1);
  };

  // Idle timer configuration
  const handleOnIdle = () => {
    handleLogout();
  };

  const { reset } = useIdleTimer({
    timeout: 24 * 60 * 60 * 1000, // one day logout
    onIdle: handleOnIdle,
  });

  // Reset the idle timer on user activity
  const handleActivity = () => {
    reset();
  };

  useEffect(() => {
    // Add event listeners for user activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("mousedown", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("touchmove", handleActivity);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("touchmove", handleActivity);
    };
  }, []);

  return (
    <>
      {/* Side Menu */}
      <div
        className={`bg-gradient-to-r from-[#05292B] to-black fixed h-screen pt-8 ${
          open
            ? "relative w-28 lg:w-48 sm:w-36 md:w-40 duration-300 "
            : "w-16 duration-300"
        } relative`}
      >
        {/* Toggle Button */}
        <BsFillArrowLeftCircleFill
          className={`text-white text-2xl rounded-full absolute -right-1  top-9 border border-black cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />

        {/* Logo */}
        <Link legacyBehavior href="/dashboard">
          <div className={`flex ${open && "w-66"} ${!open && "w-10 ml-2"} `}>
            <Image
              className={`cursor-pointer ${open && "flex duration-300"} ${
                !open && "hidden"
              }`}
              src={bhive_logo}
              alt="logo"
            />

            <Image
              className={`cursor-pointer ${!open && "flex"} ${
                open && "hidden duration-300"
              }`}
              src={B_logo}
              alt="logo"
            />
          </div>
        </Link>

        {/* Menu Items */}
        <div
          className={`inline-flex flex-col w-full mt-10 ${
            !open && "items-center"
          }`}
        >
          <Link legacyBehavior href="/opportunities">
            <div className="group inline-flex mt-7 p-2 cursor-pointer">
              {messageCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ${open">
                  {messageCount}
                </span>
              )}
              <TbHomeStats
                size={28}
                className={`text-white mr-3 sm:w-5 md:w-6  ${
                  open
                    ? "rotate-360 hover:text-green-500"
                    : "hover:text-green-500"
                }`}
              />
              <h1
                className={`text-white sm:text-sm md:text-base ${
                  !open ? "hidden" : ""
                } truncate group`}
              >
                Opportunities
                <div className="mt-1 h-1 bg-green-500 w-full transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200"></div>
              </h1>
            </div>
          </Link>

     

          <Link legacyBehavior href="/earnings">
            <div className="group inline-flex mt-7 p-2 cursor-pointer">
              
              <FaHandHoldingUsd
                size={28}
                className={`text-white mr-3 sm:w-5 md:w-6  ${
                  open
                    ? "rotate-360 hover:text-green-500"
                    : "hover:text-green-500"
                }`}
              />
              <h1
                className={`text-white sm:text-sm md:text-base ${
                  !open ? "hidden" : ""
                } truncate group`}
              >
                Earnings
                <div className="mt-1 h-1 bg-green-500 w-full transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200"></div>
              </h1>
            </div>
          </Link>

          <Link legacyBehavior href="/payouts">
            <div className="group inline-flex mt-7 p-2 cursor-pointer">
              <GiCash
                size={28}
                className={`text-white mr-3 sm:w-5 md:w-6  ${
                  open
                    ? "rotate-360 hover:text-green-500"
                    : "hover:text-green-500"
                }`}
              />
              <h1
                className={`text-white sm:text-sm md:text-base ${
                  !open ? "hidden" : " "
                } truncate group`}
              >
                Payouts
                <div className="mt-1 h-1 bg-green-500 w-full transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200"></div>
              </h1>
            </div>
          </Link>

          <Link legacyBehavior href="/yield">
            <div className="group inline-flex mt-7 p-2 cursor-pointer">
              <FaChartBar
                size={28}
                className={`text-white mr-3 sm:w-5 md:w-6  ${
                  open
                    ? "rotate-360 hover:text-green-500"
                    : "hover:text-green-500"
                }`}
              />
              <h1
                className={`text-white sm:text-sm md:text-base ${
                  !open ? "hidden " : ""
                } truncate group`}
              >
                Yield
                <div className="mt-1 h-1 bg-green-500 w-full transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200"></div>
              </h1>
            </div>
          </Link>

          {/* Logout Button */}
          {/* <button
            onClick={handleLogout}
            className={`w-full group inline-flex absolute bottom-10 cursor-pointer p-2 hover:bg-primary`}
          >
            <MdLogout
              size={28}
              className={`text-white mr-3 sm:w-5 md:w-6 ${
                open && "rotate-360  justify-center"
              } ${!open && "ml-3"}`}
            />
            <h1
              className={`text-white sm:text-sm md:text-base ${
                !open && "hidden"
              }`}
            >
              Logout
            </h1>
          </button> */}

          <button
            onClick={handleLogout}
            className={`group inline-flex absolute bottom-10 cursor-pointer p-2  ${
              open ? "rotate-360 hover:text-green-500" : "hover:text-green-500"
            }`}
          >
            <MdLogout
              size={28}
              className={`text-white mr-3 sm:w-5 md:w-6  ${
                open
                  ? "rotate-360 hover:text-green-500"
                  : "hover:text-green-500"
              }`}
            />
            <h1
              className={`text-white sm:text-sm md:text-base ${
                !open ? "hidden" : ""
              } truncate group`}
            >
              Logout
              <div className="mt-1 h-1 bg-green-500 w-full transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200"></div>
            </h1>
          </button>
        </div>
      </div>
    </>
  );
};

export default Side;
