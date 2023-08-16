import React from "react";


const DashboardCard = ({ title, content,value ,investmentData}) => {

  return (
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-md shadow-green-500/50 mb-4 group">
      <h3 className="text-xl font-bold mb-2 relative inline-block ">
        {title}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200 -mb-1"></div>
      </h3>
      <p >{content}</p>
      <p className="text-lg mt-3 text-gray-500 font-bold text-left ml-2">{value} </p>
      

{investmentData ? (
        <div className="mt-3">
          <div className="ml-2">
            
            {investmentData.map((data) => (
              <span key={data.fundid} className="mr-10 font-semibold underline  " >
                 {data.fundid} 
              </span>
            ))}
          </div>
          <div className=" ml-1 mt-2">
            {investmentData.map((data) => (
              <span key={data.fundid} className="mr-11 text-gray-500 text-left text-md font-bold">
               {data.count}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

    </div>
  );
};

export default DashboardCard;
