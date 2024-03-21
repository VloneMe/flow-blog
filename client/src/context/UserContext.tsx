import { ReactNode, createContext, useState } from "react";

interface User {
  username: string;
  // Other user properties...
}

interface UserContextType {
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
}

interface Props {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
  userInfo: null,
  setUserInfo: () => null
});

export const UserContextProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
