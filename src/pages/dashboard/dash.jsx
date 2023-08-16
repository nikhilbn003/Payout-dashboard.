// // import { useRouter } from "next/router";

// // const RowDetail = () => {
// //   const router = useRouter();
// //   const { id } = router.query;

// //   // Fetch the row data based on the id from the API or other data source

// //   return <h1>Row Detail Page - ID: {id}</h1>;
// // };

// // export default RowDetail;

import React from "react";

const Dashboard = () => {
  const plans = [
    {
      name: "Earning Details",
      price: "₹4900",
      features: {
        Earn_month: '2023-05',
        grossearnings: 5000,
      },
    },
  ];

  return (
    <div className="w-screen h-full bg-white">
      <div className="flex justify-center flex-wrap">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border w-full max-w-sm md:w-1/2 lg:w-1/3 mx-3 rounded-lg shadow-lg mt-5"
          >
            <div className="flex flex-col items-center md:items-start px-6 py-4">
              <div className="flex flex-col w-24">
                <h2 className="font-bold text-xl">{plan.name}</h2>
                <div className="border-2 border-green-500 mb-3 text"></div>
              </div>
              <div className="text-gray-500 text-center md:text-start">
                <p className="mb-4">per month information</p>
                {Object.keys(plan.features).map((key, index) => (
                  <li key={index}>
                    {key}: {plan.features[key]}
                  </li>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start bg-gray-100 px-6 py-3 rounded-lg">
              <p className="text-gray-600">Total Earning</p>
              <h2 className="font-bold text-2xl mb-2">{plan.price}</h2>
              
              <button className="bg-green-800 px-4 py-2 mt-3 rounded font-semibold text-white hover:bg-green-600">
               checkout 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
