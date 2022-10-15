import { signOut, getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import app from "../firebase/firebase.init";

import OverAllPage from "./OverAllPage";

const auth = getAuth(app);

const UserProfile = () => {
  const user = useLoaderData();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, [user]);
  console.log(user);
  console.log(isLoaded);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successfully");
        navigate("/sign-in");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <OverAllPage>
      <div className="p-5 rounded shadow-lg">
        {!isLoaded && <p>Loading...</p>}
        {isLoaded && (
          <div>
            <h1>
              Hello <span className="text-success">{user.displayName}</span>
            </h1>
            <p>
              Your Email: {user.email}{" "}
              {!user.emailVerified && (
                <button type="button" className="btn btn-link">
                  Varify Your Email
                </button>
              )}
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={signOutHandler}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </OverAllPage>
  );
};

export default UserProfile;
