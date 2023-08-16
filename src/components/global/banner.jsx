import Image from "next/image";
import Carousel from "react-responsive-carousel";
import { FiMapPin, FiPackage } from "react-icons/fi";
import { BsFillGeoFill } from "react-icons/bs";
import { FaMoneyBillAlt, FaMoneyCheckAlt, FaPercentage } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import Bhive_logo from "../../../public/bhive/logo_white.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useMediaQuery } from "react-responsive";
import React from "react";

const bannerData = {
  title: "Bhive JBR",
  subtitle: "Asset Leasing Premium",
  location:
    "Jbr tech park near whitefield metro station, Whitefield, Bangalore",
  area: "12000 sqft",
  payout: "Monthly",
  units: "150",
  assetValue: "1,000,000",
  minInvestment: "10,000",
  returnRate: "16.5%",
  carouselImages: [
    "https://bhive-public-files.s3.ap-south-1.amazonaws.com/property/image/platinum-IDN/img3.png",
    "https://bhive-public-files.s3.ap-south-1.amazonaws.com/property/image/platinum-IDN/img2.png",
    " https://bhive-public-files.s3.ap-south-1.amazonaws.com/property/image/platinum-IDN/img1.png",
  ], // URLs of the carousel images
};

const Banner = ({ bannerData }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const isMediumScreen = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });

  return (
    <>
      <div className="relative lg:w-1/4 bg-[#05292B] to-  text-white rounded-2xl p-6 lg:ml-3 lg:mt-5">
        <h2 className="text-center text-xl font-bold mb-4">
          {bannerData.title}
        </h2>
        <h1 className="text-center text-3xl font-bold mb-4">
          {bannerData.subtitle}
        </h1>

        {isSmallScreen || isMediumScreen ? null : (
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            className="lg:w-auto md:w-auto"
          >
            {bannerData.carouselImages.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt={`Carousel Image ${index + 1}`}
                  className="mx-auto mb-4"
                  width={200}
                  height={200}
                />
              </div>
            ))}
          </Carousel>
        )}

        <div className="relative flex lg:flex-col sm:flex-row">
          <div className="flex items-center mt-5">
            <FiMapPin
              size={isSmallScreen || isMediumScreen ? 64 : 32}
              className="mr-2"
            />
            <p>{bannerData.location}</p>
          </div>

          <div className="flex items-center mt-4">
            <BsFillGeoFill
              size={isSmallScreen || isMediumScreen ? 40 : 22}
              className="mr-2"
            />
            <p>Area: {bannerData.area}</p>
          </div>

          {/* Payout */}
          <div className="flex items-center mt-4">
            <BiRupee
              size={isSmallScreen || isMediumScreen ? 40 : 22}
              className="mr-2"
            />
            <p>Payout: {bannerData.payout}</p>
          </div>

          {/* No of Units */}
          <div className="flex items-center mt-4">
            <FiPackage
              size={isSmallScreen || isMediumScreen ? 40 : 22}
              className="mr-2"
            />
            <p>No of Units: {bannerData.units}</p>
          </div>

          {/* Asset Value */}
          <div className="flex items-center mt-4">
            <FaMoneyBillAlt
              size={isSmallScreen || isMediumScreen ? 40 : 22}
              className="mr-2"
            />
            <p>Asset Value: {bannerData.assetValue}</p>
          </div>

          {/* Min Investment */}
          <div className="flex items-center mt-4">
            <FaMoneyCheckAlt
              size={isSmallScreen || isMediumScreen ? 40 : 22}
              className="mr-2"
            />
            <p>Min Investment: {bannerData.minInvestment}</p>
          </div>

          {/* Return Rate */}
          <div className="flex items-center mt-4">
            <FaPercentage
              size={isSmallScreen || isMediumScreen ? 40 : 22}
              className="mr-2"
            />
            <p>Return Rate: {bannerData.returnRate}</p>
          </div>
        </div>

        {/* Logo */}
        {isSmallScreen || isMediumScreen ? null : (
          <div className="flex item-center absolute inset-x-0 bottom-4  ">
            <Image
              src={Bhive_logo}
              alt="Banner"
              className="mx-auto"
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Banner;
