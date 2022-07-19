import React from "react";
import { Rings } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className=" flex justify-center items-center w-full self-center h-full">
      <Rings height="100" width="100" color="cyan" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
