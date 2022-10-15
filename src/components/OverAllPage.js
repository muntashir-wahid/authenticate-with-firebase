import React from "react";

const OverAllPage = (props) => {
  return (
    <main className="min-vh-100 bg-light d-flex justify-content-center align-items-center">
      {props.children}
    </main>
  );
};

export default OverAllPage;
