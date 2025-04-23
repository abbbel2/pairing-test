import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useTypedSelector } from "@/store";
import { getSavedUser } from "@/store/slices/user/user.util";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { login } = useTypedSelector((state) => state.user);
  const user = getSavedUser();

  if (!login.payload?.data && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
