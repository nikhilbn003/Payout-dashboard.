import React from "react";

const Button = ({
  onClick,
  label,
  label1,
  className,
  lclassName,
  l1className,
  ...rest
}) => {
  return (
    <button
      type="submit"
      className={`bg-primary hover:bg-green-500 hover:text-white whitespace-nowrap font-semibold py-2 px-7 rounded drop-shadow-xl ${className} `}
      onClick={onClick}
      {...rest}
    >
      <span className={` ${lclassName}`}>{label}</span>
      <span className={`${l1className}`}>{label1}</span>
    </button>
  );
};

export default Button;
