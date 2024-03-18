import React from "react";
import { useMeStore } from "@/store/useMeStore";
import { useRouter } from "next/router";
import MainSkeletonLoading from "./loading/MainSkeletonLoading";

const ProtectetAdmin = ({ children }) => {
  const isLoading = useMeStore((state) => state.isLoading);
  const me = useMeStore((state) => ({
    id: state.id,
    email: state.email,
    createdAt: state.createdAt,
    deletedAt: state.deletedAt,
    role: state.role,
  }));
  const router = useRouter();

  if (isLoading) return <MainSkeletonLoading />;
  if (!me.id) {
    router.replace("/");
    return null;
  }
  if (me.role !== "super-admin") {
    router.replace("/");
    return null;
  }
  return <>{children}</>;
};

export default ProtectetAdmin;
