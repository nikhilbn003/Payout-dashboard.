import React, { useState, useEffect } from "react";
import Image from "next/image";
import Close from "../../../public/bhive/close.png";
import Success from "../../../public/bhive/success.png";
import { useRouter } from "next/router";
import Button from "../../components/global/custButton";

const SuccessModal = ({ isOpen, onClose, title, formDetails, body,routePath }) => {
  const router = useRouter();
  const [copiedValue, setCopiedValue] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const copyValue = (value) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  if (!isOpen) {
    return null;
  } else {
    return (
      <div>
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center md:inset-0 h-modal md:h-full overflow-y-auto">
          <div className="absolute grid mt-12 rounded-b-lg w-screen lg:max-w-2xl  md:max-w-xl sm:max-w-lg max-w-lg ml-16">
            <div className="absolute bg-gradient-to-bl from-[#0c2a2b] to-[#050717] rounded-t-lg grid grid-cols-2 mt-10">
              <h3 className="font-bold dark:text-primary sm:mx-28 md:mx-36 p-10 whitespace-nowrap lg:text-2xl">
                {title}
              </h3>


            </div>
            <div className="bg-white mt-36 rounded-b-lg w-screen lg:max-w-2xl md:max-w-xl sm:max-w-lg max-w-xs">
              <Image
                className="w-40 lg:mx-auto py-2 sm:mx-44 mx-auto md:ml-52"
                src={Success}
                alt={"Success"}
              />

              <div className="space-y-3 whitespace-nowrap my-5 flex justify-center">
                <p className="text-black lg:mx-72 sm:mx-44 md:mx-52 my-5 font-bold">
                  {body}
                </p>
                {formDetails &&
                  Object.entries(formDetails).map(([key, value]) => (
                    <p key={key} className="lg:mx-72 md:mx-52  sm:mx-44">
                      <span className="font-semibold mx-0.5 text-black">
                        {key}:
                      </span>{" "}
                      {value}
                      {typeof value === "string" && (
                        <button
                          className="text-primary   ml-4 focus:outline-none"
                          onClick={() => copyValue(value)}
                        >
                          {isCopied && copiedValue === value ? (
                            <span className="text-primary">Copied</span>
                          ) : (
                            <>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              >
                                <rect
                                  width="24"
                                  height="24"
                                  stroke="none"
                                  fill="#000000"
                                  opacity="0"
                                />

                                <g transform="matrix(1 0 0 1 12 14)">
                                  <path
                                    style={{
                                      stroke: "none",
                                      strokeWidth: "1",
                                      strokeDasharray: "none",
                                      strokeLinecap: "butt",
                                      strokeDashoffset: "0",
                                      strokeLinejoin: "miter",
                                      strokeMiterlimit: "4",
                                      fill: "green",
                                      fillRule: "nonzero",
                                      opacity: "1",
                                    }}
                                    transform="translate(-12, -12)"
                                    d="M 2 2 L 2 18 L 4 18 L 4 4 L 18 4 L 18 2 L 2 2 z M 6 6 L 6 22 L 22 22 L 22 6 L 6 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z"
                                    strokeLinecap="round"
                                  />
                                </g>
                              </svg>
                            </>
                          )}
                        </button>
                      )}
                    </p>
                  ))}
              </div>
              <div
                className="flex flex-col items-center justify-center p-4"
                onClick={() => router.push(routePath)}
              >
                <Button label="OK" className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SuccessModal;
