"use client";

import  { createContext, useContext, ReactNode } from "react";

interface FakeUser {
  id: string;
  email: string;
  user_metadata: { display_name?: string; full_name?: string };
}

interface AuthContextValue {
  session: { user: FakeUser } | null;
  user: FakeUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const demoUser: FakeUser = {
  id: "demo-user",
  email: "demo@example.com",
  user_metadata: { display_name: "Demo" },
};

const AuthContext = createContext<AuthContextValue>({
  session: { user: demoUser },
  user: demoUser,
  loading: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        session: { user: demoUser },
        user: demoUser,
        loading: false,
        signOut: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);