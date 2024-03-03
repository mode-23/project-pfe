import { useMeStore } from "@/store/useMeStore";
import React from "react";
import { useRouter } from "next/router";
import MainSkeletonLoading from "./loading/MainSkeletonLoading";
const ProtectedRoute = ({ children }) => {
  const isLoading = useMeStore((state) => state.isLoading);
  const me = useMeStore((state) => ({
    id: state.id,
    email: state.email,
    createdAt: state.createdAt,
    deletedAt: state.deletedAt,
  }));
  const router = useRouter();

  if (isLoading) return <MainSkeletonLoading />;

  if (!me.id) {
    router.replace("/");
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
