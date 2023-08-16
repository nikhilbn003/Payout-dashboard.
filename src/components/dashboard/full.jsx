import React from "react";
import LineGraph from "./chart";
import DashboardCard from "./card";
import { useEffect } from "react";
import { useState } from "react";
import {
  Earnings,
  investments,
  Opportunities,
  payoutapi,
} from "../../services/dashboardApi";
import TableWithShowMore from "./dashboardTable";
import moment from "moment/moment";
import AOS from "aos";
import "aos/dist/aos.css";

const Full = () => {
  const [loading, setLoading] = useState(true);
  const [payoutCount, setPayoutCount] = useState(0);
  const [investmentCount, setInvestmentCount] = useState([]);
  const [opportunitiesCount, setOpportunitiesCount] = useState(0);
  const [earningData, setEarningData] = useState([]);
  const [payoutData, setPayoutData] = useState([]);
  const [payoutMonth, setPayoutMonth] = useState("");
  const [earnMonth, setEarnMonth] = useState("");

  const earningHeaders = {
    title: "Recent Earnings",

    columns: ["opportunity Name", "Total Amount", "Gross Earn"],
  };

  const payoutHeaders = {
    title: "Recent Payouts",
    columns: ["name", "opportunity Name", "Earn Amount"],
  };

  const payoutLink = "/payouts";
  const earningLink = "/earnings";

  useEffect(() => {
    const fetchData = async () => {
      AOS.init({
        duration: 1000,
        once: true,
        easing: "ease-in-out",
        // More configuration options can be added here
      });

      try {
        const earningRes = Earnings();
        const payoutRes = payoutapi();
        const investmentRes = investments();
        const opportunitiesRes = Opportunities();

        // Fetch all data using Promise.all to make simultaneous requests
        const [
          earningDataRes,
          payoutDataRes,
          investmentDataRes,
          opportunitiesDataRes,
        ] = await Promise.all([
          earningRes,
          payoutRes,
          investmentRes,
          opportunitiesRes,
        ]);

        // const earnings = earningDataRes.data.data.reverse();
        const earnings = earningDataRes.data.data.reverse().map((data) => ({
          ...data,
          "opportunity Name": data.opp_name,
          "Total Amount": data.total_earn,
          "Gross Earn": data.gross_earn,
        }));

        const firstFiveEarnings = earnings.slice(0, 5);

        // Loop through each item in the firstFiveEarnings array and access the earn_month property
        firstFiveEarnings.forEach((item) => {
          const earnMonth = item.earn_month;
          console.log("earnMonth", earnMonth);
          const formattedEarnMonth = moment(earnMonth, "YYYY-MM").format(
            "MMM YYYY"
          );
          console.log("formateed", formattedEarnMonth);
          setEarnMonth(formattedEarnMonth);
        });

        setEarningData(earnings);

        // const payData = payoutDataRes.data.data.data.map((data)=>{});

        const payData = payoutDataRes.data.data.data.map((data) => ({
          ...data,
          name: data.fname + " " + data.lname,
          "opportunity Name": data.opp_name,
          "Earn Amount": data.earn_amount,
        }));
        setPayoutData(payData);
        const payoutCount = payoutDataRes.data.data.count;
        let currentMonth = moment();
        let earnMonth = moment(currentMonth).subtract(2, "month");
        const payMonth = earnMonth.format("MMM YYYY");
        console.log("month", payMonth);
        setPayoutMonth(payMonth);
        setPayoutCount(payoutCount);

        console.log("investment", investmentDataRes);
        const investmentCount = investmentDataRes.data.data.investmentCount;
        //       setInvestmentCount(investmentCount);

        const Name = payData.fname + payData.lname;
        const fundNames = {
          1: "PROFIT_SHARE",
          2: "RBF",
          3: "FRE",
          4: "AL",
          5: "UHNI",
          6: "ALP",
        };

        // Replace fundid with fund name in the investment data
        const investmentDataWithNames = investmentCount.map((data) => ({
          count: data.count,
          fundid: fundNames[data.fundid],
        }));

        setInvestmentCount(investmentDataWithNames);
        console.log(
          "Investment Data with Fund Names:",
          investmentDataWithNames
        );

        const opportunitiesCount =
          opportunitiesDataRes.data.opportunities.length;
        setOpportunitiesCount(opportunitiesCount);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-4 border-t-8 border-green-400 h-16 w-16 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <Layout> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        {/* Line Graph on the right */}
        <div className="md:col-span-2 lg:col-span-2 lg:mr-5" data-aos="fade-up">
          <LineGraph earningsData={earningData} />
        </div>

        <div className="md:col-span-1 grid grid-cols-1 gap-5 mt-7">
          {/* Two cards in the same row */}
          <div className="grid grid-cols-2 gap-5" data-aos="zoom-in">
            <DashboardCard
              title="Payouts"
              content={
                <p>
                  Payout for the month{" "}
                  <span className="font-bold">{payoutMonth}</span>
                </p>
              }
              value={payoutCount}
            />
            <DashboardCard
              title="Opportunities"
              content="Total no of Opportunities"
              value={opportunitiesCount}
            />
          </div>

          {/*  below the other two */}
          <div data-aos="zoom-in">
            <DashboardCard
              title="Investments"
              // content="Total no of investments"
              // value={investmentCount.length}
              investmentData={investmentCount}
            />
          </div>
        </div>

        {/* Two tables below the chart */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5" data-aos="fade-up">
          {/* <Tabledash
            data={sampleData}
            columns={["value1", "value2", "value3"]}
          /> */}
          <TableWithShowMore
            headers={earningHeaders}
            month={earnMonth}
            data={earningData}
            showMoreLink={earningLink}
          />
          <TableWithShowMore
            headers={payoutHeaders}
            month={payoutMonth}
            data={payoutData}
            showMoreLink={payoutLink}
          />
        </div>
      </div>
      {/* </Layout> */}
    </>
  );
};

export default Full;
