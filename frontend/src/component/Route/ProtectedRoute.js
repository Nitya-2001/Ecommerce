import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading with a setTimeout
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust delay time as needed

    return () => clearTimeout(loadingTimeout);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator while loading
  }

  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  // If user data is available and authenticated, render the provided element
  return <>{element}</>;
};

export default ProtectedRoute;
