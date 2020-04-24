import React from "react";
import { ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

const LoadingLittleGuy = () => {
  const loading = useSelector((state) => state.loading);
  return <ActivityIndicator size="large" color="#134e5e" animating={loading} />;
};

export default LoadingLittleGuy;
