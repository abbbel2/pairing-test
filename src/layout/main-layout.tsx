import { Header } from "@/components/header";
import { FC, ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />

      <div className="m-8">{children}</div>
    </div>
  );
};
