import React, { useState } from "react";
import Table from "../../components/global/table";
import Layout from "../../components/layout";
import SearchBar from "../../components/global/searchBar";
import yieldData from "../../../data/yieldData";
import TablePagination from "../../components/global/tablePagination";
import Button from "../../components/global/custButton";
import { FiMapPin, FiPackage } from "react-icons/fi";
import { BsFillGeoFill } from "react-icons/bs";
import { FaMoneyBillAlt, FaMoneyCheckAlt, FaPercentage } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import Bhive_logo from "../../../public/bhive/logo_white.png";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";

const columns = [
  "yield_id",
  "opp_id",
  "type",
  "tenure",
  "net_irr",
  "year1",
  "year2",
  "year3",
  "year4",
  "year5",
  "status",
  "created_at",
];
const pageLimit = 10;

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

// filter data from the table based on fund type
const fund_options = [
  { value: "", label: "select a fund type" },
  ...Array.from(new Set(yieldData.map((option) => option.type))).map(
    (type) => ({
      value: type,
      label: type,
    })
  ),
];

const payOpp = () => {
  const router = useRouter();
  const { id, name } = router.query;
  const [searchPage, setSearchPage] = useState("yield_id,opp_id");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState(yieldData);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // Filter data based on search term
  const filteredData = filterData.filter(
    (item) =>
      item.yield_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.opp_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Table pagination
  const offset = currentPage * pageLimit;
  const currentData = filteredData.slice(offset, offset + pageLimit);
  const pageCount = Math.ceil(filteredData.length / pageLimit);

  // Event handler for pagination
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Event handler for search bar
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(0); // Reset current page to the first page
  };

  // Filtering data based on the selected option
  const typeChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    // Filter the yieldData based on the selectedOption
    const filtered = yieldData.filter((item) => {
      if (selectedOption.value === "") {
        return true; // Return all data when no option is selected
      } else {
        // Return data that matches the selectedOption
        return item.type === selectedOption.value;
      }
    });
    // Set the filtered data to the state
    setFilterData(filtered);
    setCurrentPage(0); // Reset current page to the first page
  };

  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const isMediumScreen = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const islargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <>
      <Layout>
        <div className="sm:mx-px lg:mx-2 mt-4 ml-3">
          <h2 className="text-2xl font-bold mb-4 sm:ml-3 lg:ml-4">
            {" "}
            Payout Reports{" "}
          </h2>

          <span className="flex justify-between pt-4 sm:mx-3 sm:w-auto md:w-auto lg:w-auto rounded-xl bg-white">
            <div className="mb-3">
              <SearchBar />
            </div>
          </span>
          {/* banner */}

          <div className="flex flex-col lg:flex-row-reverse m-5">
            <div className="w-auto relative lg:w-1/4 bg-[#05292B] to-  text-white rounded-2xl p-6 lg:ml-3 lg:mt-5">
              <h2 className="text-center text-xl font-bold mb-4">{id}</h2>
              <h1 className="text-center text-3xl font-bold mb-4">{name}</h1>

              {isSmallScreen || isMediumScreen ? null : (
                <Carousel
                  autoPlay
                  infiniteLoop
                  showThumbs={false}
                  className=" lg:w-auto md:w-auto "
                >
                  {bannerData.carouselImages.map((image, index) => (
                    <div key={index}>
                      <Image
                        src={image}
                        alt={`Carousel Image ${index + 1}`}
                        className="mx-auto mb-4"
                        width={100}
                        height={100}
                      />
                    </div>
                  ))}
                </Carousel>
              )}

              <div className="">
                <div className="relative flex lg:flex-col sm:flex-row">
                  <div className="flex items-center mt-5 ">
                    <FiMapPin
                      size={
                        (isSmallScreen && isMediumScreen) || islargeScreen
                          ? 56
                          : 20
                      }
                      className="mr-2"
                    />
                    <p>{bannerData.location}</p>
                  </div>

                  <div className="flex items-center mt-4">
                    <BsFillGeoFill
                      size={
                        (isSmallScreen && isMediumScreen) || islargeScreen
                          ? 24
                          : 20
                      }
                      className="mr-2"
                    />
                    <p>Area: {bannerData.area}</p>
                  </div>

                  <div className="flex items-center mt-4 ">
                    <BiRupee
                      size={
                        (isSmallScreen && isMediumScreen) || islargeScreen
                          ? 24
                          : 20
                      }
                      className="mr-2"
                    />
                    <p>Payout: {bannerData.payout}</p>
                  </div>

                  <div className="flex items-center mt-4">
                    <FiPackage
                      size={
                        (isSmallScreen && isMediumScreen) || islargeScreen
                          ? 24
                          : 20
                      }
                      className="mr-2"
                    />
                    <p>No of Units: {bannerData.units}</p>
                  </div>

                  <div className="flex items-center mt-4 ">
                    <FaMoneyBillAlt
                      size={
                        (isSmallScreen && isMediumScreen) || islargeScreen
                          ? 24
                          : 20
                      }
                      className="mr-2"
                    />
                    <p>Asset Value: {bannerData.assetValue}</p>
                  </div>

                  <div className="flex items-center mt-4 lg:justify-start sm:justify-end ">
                    <FaMoneyCheckAlt
                      size={
                        (isSmallScreen && isMediumScreen) || islargeScreen
                          ? 24
                          : 20
                      }
                      className="mr-2"
                    />
                    <p>Min Investment: {bannerData.minInvestment}</p>
                  </div>

                  <div className="flex items-center mt-4 ">
                    <FaPercentage
                      size={
                        (isSmallScreen && isMediumScreen) || islargeScreen
                          ? 24
                          : 20
                      }
                      className="mr-2"
                    />
                    <p>Return Rate: {bannerData.returnRate}</p>
                  </div>
                </div>
              </div>

              {islargeScreen ? (
                <div className="flex item-center mt-7 bottom-2">
                  <Image
                    src={Bhive_logo}
                    alt="Banner"
                    className="mx-auto"
                    width={200}
                    height={200}
                  />
                </div>
              ) : null}
            </div>

            <div className="lg:w-4/5">
              <Button
                label="View"
                className="bg-primary text-white lg:w-auto md:mt-5 sm:mt-5 sm:w-20 md:w-28"
              />
              <Table data={currentData} columns={columns} />
            </div>
          </div>
          <div className="flex justify-center my-4">
            <TablePagination
              pageCount={pageCount}
              onPageChange={handlePageClick}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default payOpp;
