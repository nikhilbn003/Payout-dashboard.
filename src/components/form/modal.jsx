import React, { useState } from "react";
import { ServerConfig } from "../../../global/config";
import { POST } from "../../../utils/API";

const Modal = ({ isOpen, onClose, onValueSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValues, setSelectedValues] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   const tableData = [
  //     { id: 1, name: 'Value 1', age: 25, gender: 'Male' },
  //     { id: 2, name: 'Value 2', age: 30, gender: 'Female' },
  //     { id: 10, name: 'Value 3', age: 35, gender: 'Male' },
  //   ];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue === "") {
      return;
    }
    console.log("Submitted value:", inputValue);
    setSelectedValues((prevValues) => [...prevValues, inputValue]);
    // setInputValue('');

    const modifiedValues = {
      value: inputValue,
    };
    try {
      const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
      setIsLoading(true);
      POST(
        SERVER_TYPE,
        "/Investment/getInvestor",
        JSON.stringify(modifiedValues)
      )
        .then((response) => {
          console.log("Investments", response.data.data);
          const extractedData = response.data.data.investments.map((item) => ({
            id: item.id,
            name: item.name,
          }));
          setTableData(extractedData);
          console.log("extract", extractedData);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleValueSelect = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues();
    } else {
      setSelectedValues(value);
    }
  };

  const handleModalSubmit = () => {
    console.log("Selected values:", selectedValues);
    onValueSubmit(selectedValues);
    onClose();
  };

  const handleClose = () => {
    setTableData([]);
    setInputValue("");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Investment detail</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                {/* <span className="text-black">x</span> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5"
                >
                  <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="relative flex justify-between items-center">
                <div className="relative">
                  <label
                    htmlFor="Name"
                    className={`absolute text-sm z-0 ${
                      inputValue ? "text-black" : "text-gray-500"
                    } duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                      inputValue !== "" ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    name
                  </label>
                  <input
                    type="text"
                    id="Name"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="please Enter name"
                    className={`px-2.5 mb-8 pb-2.5 pt-4 w-full text text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-black dark:border-gray-300 ${
                      inputValue ? "border-green-600" : ""
                    }`}
                  />
                </div>
                <div className="-mt-9 ml-6">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-green-400 text-white font-bold py-2 px-8 rounded-lg"
                  >
                    Find
                  </button>
                </div>
              </div>
            </form>

            {selectedValues.length > 0 && (
              <>
                {isLoading ? (
                  <p className="mt-4 text-center">Loading...</p>
                ) : tableData.length > 0 ? (
                  <table className="w-full mt-4">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Select</th>
                        {Object.keys(tableData[0]).map((key) => (
                          <th className="py-2 px-4 border-b" key={key}>
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b">
                            <input
                              type="checkbox"
                              checked={selectedValues.includes(row.id)}
                              onChange={() => handleValueSelect(row.id)}
                            />
                          </td>
                          {Object.values(row).map((value, index) => (
                            <td className="py-2 px-4 border-b" key={index}>
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="mt-4 text-center">No data available.</p>
                )}
              </>
            )}
            {selectedValues.length === 0 ? (
              <></>
            ) : (
              // <p className="text-red-600 text-center mt-4">Please select at least one value from the table.</p>
              <div className="flex justify-center">
                <button
                  onClick={handleModalSubmit}
                  className="bg-primary hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-6"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
