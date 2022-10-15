import { Fragment, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import UserProfile from "./components/UserProfile";
import VarifyEmail from "./components/VarifyEmail";

function App() {
  const [newUser, setNewUser] = useState({});
  const [signedInUser, setSignedInUser] = useState({});
  // const navigate = useNavigate();

  const signedUpUserHandler = (user) => {
    setNewUser(user);
  };

  const varifyEmail = (currentUser) => {
    console.log(currentUser);
  };

  const signedInUserHandler = (user) => {
    setSignedInUser(user);
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Fragment>
        <Route
          path="/"
          element={
            <SignUpForm
              onSignedUp={signedUpUserHandler}
              currentUser={varifyEmail}
            />
          }
        />
        <Route
          path="/sign-up"
          element={
            <SignUpForm
              onSignedUp={signedUpUserHandler}
              currentUser={varifyEmail}
            />
          }
        />

        <Route
          path="/sign-in"
          element={<SignInForm onSignedIn={signedInUserHandler} />}
        />
        <Route
          path="/varify-user"
          element={<VarifyEmail />}
          loader={() => newUser}
          exact
        />
        <Route
          path="/profile"
          element={<UserProfile />}
          loader={() => signedInUser}
        />
        <Route path="/*" element={<h1>Page not found</h1>} />
      </Fragment>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
