import { USER_DATA } from "@/store/data";
import { ApiState } from "@/store/store.util";

export const mockLogin = ({
  email,
  password,
}: LoginPayload): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = USER_DATA.find(
        (item) => item.email === email && item.password === password
      );
      if (user) {
        saveUser(user);
        resolve({
          status: "success",
          message: "Login successful",
          token: "mock-jwt-token-123456",
          exp: Date.now() + 60 * 60 * 1000,
          data: user,
        });
      } else {
        reject({
          status: "error",
          message: "Login failed",
        });
      }
    }, 2000);
  });
};

const saveUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeSavedUser = () => {
  localStorage.removeItem("user");
};

export const getSavedUser = (): string | null => {
  return localStorage.getItem("user") || null;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  exp: number;
  status: "success" | "error";
  message: string;
  data: User;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type UserStateTypes = {
  login: ApiState<LoginResponse | null>;
  user: User | null;
};
