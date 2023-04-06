import React from "react";
import Col from "react-bootstrap/Col";

export default function ScoopOption({ name, imagePath }) {
  //   const sampleOptionObj = {
  //     name: "Chocolate",
  //     imagePath: "/images/chocolate.png",
  //   };
  return (
    //if the screen is smal, I want the image get the whole row!
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        // src={`http://localhost:3030${imagePath}`}
        src={imagePath}
        alt={`${name} scoop`}
      />
    </Col>
  );
}
