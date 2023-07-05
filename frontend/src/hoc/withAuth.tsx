import { FC } from "react";
import { useAuthContext } from "../context";
import { useNavigate } from "react-router-dom";
import { useEffectIf } from "src/hooks";

type withAuthFn = (Component: FC) => FC;

export const withAuth: withAuthFn = (Component) => {
  const Authenticated: FC = (): JSX.Element | null => {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    useEffectIf(!isAuthenticated, () => {
      navigate("/login");
    });
    return isAuthenticated ? <Component /> : null;
  };
  return Authenticated;
};
