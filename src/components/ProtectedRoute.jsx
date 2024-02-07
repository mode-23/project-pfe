import { useMeStore } from "@/store/useMeStore";
import React from "react";
import { useRouter } from "next/router";
const ProtectedRoute = ({ children }) => {
  const isLoading = useMeStore((state) => state.isLoading);
  const me = useMeStore((state) => ({ id: state.id, email: state.email }));
  const router = useRouter();

  if (isLoading) return <div>loading...</div>;

  if (!me.id) {
    router.replace("/");
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
