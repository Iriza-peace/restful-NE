// Route.jsx
import PropTypes from "prop-types";
import { Navigate } from "react-router";
import Sidebar from "../components/sidebar/Sidebar";

 // Check if token exists in local storage and if not return to login page
export const PrivateRoute = ({ element: Component, ...rest }) => {
  const hasToken = !!localStorage.getItem("token");

  return hasToken ? (
    <div className="app">
      <Sidebar />{" "}
      <div className="app-content">
        <Component {...rest} />
      </div>
    </div>
  ) : (
    <Navigate to="/books" replace />
  );
};

// Custom PublicRoute component to handle redirection
export const PublicRoute = ({ element: Component, ...rest }) => {
  const hasToken = !!localStorage.getItem("token"); // Check if token exists in local storage

  return hasToken ? (
    <Navigate to="/books" replace />
    
  ) : (
    <Component {...rest} />
  );
};

PublicRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};
PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};
