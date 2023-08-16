import React from "react";
import { useFormik } from "formik";
import Filter from "../global/filter";
import Button from "../global/custButton";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormComponent = ({
  header,
  initialValues,
  onSubmit,
  labels,
  validationSchema,
  dropdownOptions,
  submitAs,
  customComponents,
  btClassName,
  handleTextClick,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values); 
    },
  });

  const getInputComponent = (fieldName, fieldType) => {
    if (customComponents && customComponents[fieldType]) {
      // Check if a custom component is specified for the fieldType
      const CustomComponent = customComponents[fieldType];
      return <CustomComponent fieldName={fieldName} formik={formik} />;
    }

    switch (fieldType) {
      case "text":
        return (
          <input
            type="text"
            id={fieldName}
            name={fieldName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[fieldName]}
            placeholder={labels[fieldName].placeholder}
            className={`px-2.5 pb-2.5 pt-4 w-5/6 text text-gray-900 bg-transparent rounded-lg border  border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer ${
              formik.touched[fieldName] && formik.errors[fieldName]
                ? "border-red-600"
                : ""
            }`}
          />
        );
      case "handleText":
        return (
          <input
            type="text"
            id={fieldName}
            name={fieldName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onClick={handleTextClick}
            value={formik.values[fieldName] || labels[fieldName].value}
            placeholder={labels[fieldName].placeholder}
            className={`px-2.5 pb-2.5 pt-4 w-5/6 text text-gray-900 bg-transparent rounded-lg border  border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer ${
              formik.touched[fieldName] && formik.errors[fieldName]
                ? "border-red-600"
                : ""
            }`}
          />
        );
      case "radio":
        return (
          <div className="flex">
            {Object.keys(labels[fieldName].options).map((option) => (
              <div key={option} className="mr-4">
                <input
                  type="radio"
                  id={`${fieldName}-${option}`}
                  name={fieldName}
                  value={option}
                  checked={formik.values[fieldName] === option}
                  onChange={formik.handleChange}
                  className="mr-2 mt-4"
                />
                <label htmlFor={`${fieldName}-${option}`} className="text-sm">
                  {labels[fieldName].options[option]}
                </label>
              </div>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="flex">
            {labels[fieldName].options.map((option) => (
              <div key={option} className="mr-4">
                <input
                  type="checkbox"
                  id={`${fieldName}-${option}`}
                  name={fieldName}
                  value={option}
                  checked={formik.values[fieldName].includes(option)}
                  onChange={formik.handleChange}
                  className="mr-2 mt-4"
                />
                <label htmlFor={`${fieldName}-${option}`} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      case "dropdown":
        return (
          <Filter
            options={dropdownOptions}
            onChange={(selectedOption) =>
              formik.setFieldValue(fieldName, selectedOption?.value || " ")
            }
            value={formik.values[fieldName] || ""}
            className="lg:w-5/6 md:w-5/6 sm:w-5/6 pt-4 z-60"
          />
        );

      case "date":
        return (
          <div>
            <ReactDatePicker
              id={fieldName}
              name={fieldName}
              selected={
                formik.values[fieldName]
                  ? new Date(formik.values[fieldName])
                  : null
              }
              onChange={(date) => formik.setFieldValue(fieldName, date)}
              onBlur={formik.handleBlur}
              placeholderText={
                formik.values[fieldName] ? "" : labels[fieldName].label
              }
              dateFormat="yyyy-MM-dd"
              className={`px-2.5 pb-2.5 pt-4 sm:w-[329px] md:w-[460px] lg:w-[755px]  text text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer ${
                formik.touched[fieldName] && formik.errors[fieldName]
                  ? "border-red-600"
                  : ""
              }`}
            />
          </div>
        );

      case "month":
        return (
          <>
            <div className="flex flex-col">
              {formik.values[fieldName] ? null : (
                <label
                  htmlFor={fieldName}
                  className="mb-1 ml-2 text-sm font-medium text-gray-700"
                >
                  {labels[fieldName].label}
                </label>
              )}
              <ReactDatePicker
                id={fieldName}
                name={fieldName}
                selected={
                  formik.values[fieldName]
                    ? new Date(formik.values[fieldName])
                    : null
                }
                onChange={(date) => formik.setFieldValue(fieldName, date)}
                onBlur={formik.handleBlur}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className={`px-2.5 pb-2.5 pt-4 w-5/6 text text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer ${
                  formik.touched[fieldName] && formik.errors[fieldName]
                    ? "border-red-600"
                    : ""
                }`}
              />
            </div>
          </>
        );

      case "datetime-local":
        return (
          <input
            type="datetime-local"
            id={fieldName}
            name={fieldName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[fieldName]}
            className={`px-2.5 pb-2.5 pt-4 w-5/6 text text-gray-900 bg-transparent rounded-lg border  border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer ${
              formik.touched[fieldName] && formik.errors[fieldName]
                ? "border-red-600"
                : ""
            }`}
          />
        );
      case "number":
        return (
          <input
            type="number"
            id={fieldName}
            name={fieldName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[fieldName]}
            placeholder={labels[fieldName].placeholder}
            className={`px-2.5 pb-2.5 pt-4 w-5/6 text text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer ${
              formik.touched[fieldName] && formik.errors[fieldName]
                ? "border-red-600"
                : ""
            }`}
            min={formik.values[fieldName]}
            max={formik.values[fieldName]}
          />
        );

      case "file":
        return (
          <input
            type="file"
            id={fieldName}
            name={fieldName}
            onChange={(event) => {
              formik.setFieldValue(fieldName, event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
            className="mr-2"
          />
        );
      case "image":
        return (
          <input
            type="file"
            accept="image/*"
            id={fieldName}
            name={fieldName}
            onChange={(event) => {
              formik.setFieldValue(fieldName, event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
            className="mr-2"
          />
        );
      case "nonEditable":
        return (
          <input
            type="text"
            id={fieldName}
            name={fieldName}
            value={formik.values[fieldName]}
            readOnly
            className="px-2.5 pb-2.5 pt-4 w-5/6 text text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-black dark:border-gray-300"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white lg:ml-1 rounded-2xl">
      <form onSubmit={formik.handleSubmit}>
        {/* <h2 className="ml-4 text-lg font-bold pt-5 "> {mainheader} </h2>
        <p className="ml-4">{mainheader}</p> */}
        {/* <hr /> */}
        <h2 className="text-lg font-bold pt-5 ">{header} : </h2>
        <div className="">
          {Object.keys(labels).map((fieldName) => (
            <div
              className="mb-4 mt-5 lg:ml-52 md:ml-36 sm:ml-32"
              key={fieldName}
            >
              <div className="relative">
                {getInputComponent(fieldName, labels[fieldName].type)}

                <label
                  htmlFor={fieldName}
                  className={`absolute text-sm z-0 ${
                    formik.values[fieldName]
                      ? "text-green-600"
                      : "text-gray-500"
                  } dark:text-black duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                    formik.values[fieldName] !== ""
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {labels[fieldName].label}:
                </label>
              </div>
              {formik.touched[fieldName] && formik.errors[fieldName] && (
                <div className="text-red-600">{formik.errors[fieldName]}</div>
              )}
            </div>
          ))}
        </div>

        {/* <button type="submit" onClick={formik.handleSubmit}>
          Submit
        </button> */}
        <div className="flex justify-end p-5">
          <Button
            onClick={formik.handleSubmit}
            label={submitAs}
            className={`text-white pr-16 pl-20 ${btClassName} `}
          />
        </div>
        <hr />
      </form>
    </div>
  );
};

export default FormComponent;
