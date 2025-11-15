import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateLayout() {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/login"></Navigate>;
  } else {
    return (
      <div className="flex-grow flex">
        <Outlet />
      </div>
    );
  }
}
