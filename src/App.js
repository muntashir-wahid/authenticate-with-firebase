import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

const router = createBrowserRouter([
  { path: "/", element: <SignUpForm /> },
  { path: "/sign-up", element: <SignUpForm /> },
  { path: "/sign-in", element: <SignInForm /> },
  { path: "/*", element: <h1>Page not found</h1> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
