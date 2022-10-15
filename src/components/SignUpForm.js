import React, { useState } from "react";
import app from "../firebase/firebase.init";
import OverAllPage from "./OverAllPage";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormCard from "./FormCard";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);

const SignUpForm = ({ onSignedUp, currentUser }) => {
  const [chackPasswordValidity, setCheckPasswordValidity] = useState("");

  const navigate = useNavigate();

  // Sign Up a new user

  const signUpFormHandler = (event) => {
    event.preventDefault();
    setCheckPasswordValidity("");

    // Get User Information
    const signUpForm = event.target;
    const fullName = signUpForm.fullname.value;
    const email = signUpForm.email.value;
    const password = signUpForm.password.value;

    const createUserName = (name) => name.split(" ")[0].toLowerCase();

    // Basic password validation

    if (password.trim().length < 6) {
      setCheckPasswordValidity("Please choose a password more then 6 chrecter");
      return;
    }

    // Create a New user

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const userName = createUserName(fullName);
        updateDisplayName(fullName);
        onSignedUp(user);
        navigate("/varify-user");
      })
      .catch((error) => {
        console.error(error);
      });

    signUpForm.reset();
  };

  const updateDisplayName = (displayName) => {
    updateProfile(auth.currentUser, {
      displayName: displayName,
    })
      .then(() => {
        console.log("Display Name updated");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <OverAllPage>
      <FormCard>
        <h1 className="mb-3">Sign Up</h1>
        <Form onSubmit={signUpFormHandler}>
          <Form.Group className="mb-3" controlId="formBasicFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter fullname"
              name="fullname"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </Form.Group>

          {chackPasswordValidity && (
            <p className="text-danger">{chackPasswordValidity}</p>
          )}

          <Button variant="primary" type="submit" className="mb-3">
            Sign Up
          </Button>
        </Form>
        <p>
          Already have an account?
          <Link to="/sign-in" className="text-decoration-none">
            Sign-In
          </Link>
        </p>
      </FormCard>
    </OverAllPage>
  );
};

export default SignUpForm;
