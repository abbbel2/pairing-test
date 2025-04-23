import { FC, ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-primary-foreground container grid h-svh max-w-none items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 py-8 sm:w-[480px] sm:p-8">
        <div className="mb-8 flex items-center justify-center">
          <h1 className="text-xl font-medium">Admin Login</h1>
        </div>
        {children}
      </div>
    </div>
  );
};
