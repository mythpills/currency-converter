import React from "react";
import { Alert } from "reactstrap";

interface Props {
  errorText: string
}

const ErrortText = ({ errorText }: Props) => {
  return (
    <div>
      <Alert color="danger">{errorText}</Alert>
    </div>
  );
};

export default ErrortText;
