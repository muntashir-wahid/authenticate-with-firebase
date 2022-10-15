import React from "react";

const FormCard = (props) => {
  return (
    <div className="p-5 rounded shadow-lg" style={{ maxWidth: "350px" }}>
      {props.children}
    </div>
  );
};

export default FormCard;
