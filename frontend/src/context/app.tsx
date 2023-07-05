import { UserState } from "src/types";
import { FC, ReactNode,} from "react";
import { AuthProvider } from "./auth";

type Context = {
  state: {
    user: UserState;
  };
  dispatch: React.Dispatch<{}>;
};

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
};
