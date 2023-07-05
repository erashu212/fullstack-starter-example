import React from "react";
import { useAuthContext } from "./context";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/task";
import "./App.css";
import { Link } from "react-router-dom";
import Button from "./components/Button";
import Services from "src/data/services";
import { Alert } from "./components/Alert";

export const App = () => {
  const { isAuthenticated, handleAuthentication } = useAuthContext();
  return (
    <div className="">
      <Alert />
      <nav>
        <ul>
          <li role="button" className="cancel">
            <Link to="/">Home</Link>
          </li>
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <Button
                onClick={async () => {
                  await Services.logout();
                  handleAuthentication(undefined);
                }}
              >
                Logout
              </Button>
            </li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route index path="/" element={<Home />} />
      </Routes>
    </div>
  );
};
