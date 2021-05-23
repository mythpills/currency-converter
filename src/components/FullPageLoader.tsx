import React from "react";
import { Spinner } from "reactstrap";
import "../App.css";

interface Props {
  isLoading: boolean
}
const FullPageLoader = ({ isLoading }: Props) => {
  if (!isLoading) return null;

  return (
    <div className="loaderContainer">
      <div className="loader">
        <Spinner style={{ width: "3rem", height: "3rem" }} />
      </div>
    </div>
  );
};

export default FullPageLoader;
