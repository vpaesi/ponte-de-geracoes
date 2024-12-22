import React, { createContext, useContext, useState } from "react";

type User = {
  id: number | null;
  userType: "ajudante" | "ajudado" | "default";
  name: string;
  email: string;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User>({
    id: null,
    userType: "default",
    name: "",
    email: "",
  });

  const setUser = (newUser: User) => {
    setUserState(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const clearUser = () => {
    setUserState({ id: null, userType: "default", name: "", email: "" });
    localStorage.removeItem("user");
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
