import { UserNav } from "./user-nav";

export const Header = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-8">
        <h2 className="text-2xl font-bold tracking-tight text-accent">Team admin</h2>

        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
};
