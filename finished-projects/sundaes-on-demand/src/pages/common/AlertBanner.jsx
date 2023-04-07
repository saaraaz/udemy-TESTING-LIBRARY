// 2nd Step: create AlertBanner compo:
import React from "react";
import Alert from "react-bootstrap/Alert";

export default function AlertBanner({ message, variant }) {
  // setting default values for the props:
  const alertMsg = message || "An unexpected error, try again later!";
  const alertVariant = variant || "danger";
  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMsg}
    </Alert>
  );
}

// 3rd Step: modify error handling in Options compo
