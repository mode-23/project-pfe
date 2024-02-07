import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/router";

const UserDetail = () => {
  const { query } = useRouter();
  return <ProtectedRoute>{query.id}</ProtectedRoute>;
};

export default UserDetail;
