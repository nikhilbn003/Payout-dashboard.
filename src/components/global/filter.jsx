import React from "react";
import Select from "react-select";

const Filter = ({ options, onChange, placeholder, className }) => {
  const defaultClassName = "lg:w-44 md:w-32 sm:w-28";
  const mergedClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;

  const defaultValue = options && options.length > 0 ? options[0] : null;

  return (
    <div className={mergedClassName}>
      <Select
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        components={{ IndicatorSeparator: () => null }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary: "#00C881",
          },
        })}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Filter;
