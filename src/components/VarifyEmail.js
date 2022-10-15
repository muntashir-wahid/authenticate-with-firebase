import React from "react";
import OverAllPage from "./OverAllPage";
import { useLoaderData, useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";

const VarifyEmail = () => {
  const newUser = useLoaderData();
  const navigate = useNavigate();
  const varifyEmailHandler = () => {
    sendEmailVerification(newUser).then(() => {
      console.log("sent email varification");
      navigate("/sign-in");
    });
  };

  return (
    <OverAllPage>
      <div className="p-5 rounded shadow-lg">
        <h1>Welcome new user!</h1>
        <div>
          <p>
            Your Email: {newUser.email}
            {!newUser.emailVerified && (
              <button
                onClick={varifyEmailHandler}
                type="button"
                className="btn btn-link"
              >
                Varify Your Email
              </button>
            )}
          </p>
        </div>
      </div>
    </OverAllPage>
  );
};

export default VarifyEmail;
