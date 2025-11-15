import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const token = useSelector((state) => state.auth.token);

  if (token) {
    return <Navigate to="/"></Navigate>;
  } else {
    return <Outlet></Outlet>;
  }
}
