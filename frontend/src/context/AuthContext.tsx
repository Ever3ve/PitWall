import { createContext, useState, ReactNode } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  role: "user" | "admin";
} | null;

export const AuthContext = createContext<{
  user: User;
  setUser: (u: User) => void;
}>({ user: null, setUser: () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
