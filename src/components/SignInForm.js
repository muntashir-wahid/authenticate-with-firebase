import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormCard from "./FormCard";
import OverAllPage from "./OverAllPage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

const SignInForm = ({ onSignedIn }) => {
  const navigate = useNavigate();
  const signInFormHandler = (event) => {
    event.preventDefault();
    const signInForm = event.target;
    const email = signInForm.email.value;
    const password = signInForm.password.value;
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        onSignedIn(user);
        navigate("/profile");
      })
      .catch((error) => console.log(error));
  };

  return (
    <OverAllPage>
      <FormCard>
        <h1 className="mb-3">Sign In</h1>
        <Form onSubmit={signInFormHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mb-3">
            Sign in
          </Button>
        </Form>
        <p>
          New to this website?
          <Link to="/sign-up" className="text-decoration-none">
            Sign-Up
          </Link>
        </p>
      </FormCard>
    </OverAllPage>
  );
};

export default SignInForm;
