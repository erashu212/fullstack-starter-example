import { useForm } from "src/hooks";
import { LoginUser } from "src/types";
import { validationLoginForm, validationRegisterForm } from "src/data/utils";
import { useCallback, useState } from "react";
import Input from "src/components/Input";
import Button from "src/components/Button";
import { useAuthContext } from "src/context";
import Service from "src/data/services";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { handleAuthentication } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginUser = useCallback(
    async (values: LoginUser) => {
      try {
        const result = await Service.login(values);
        if (result?.token) {
          handleAuthentication(result?.token);
          navigate("/");
        }
      } catch {
      } finally {
        setLoading(false);
      }
    },
    [handleAuthentication]
  );

  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useForm<LoginUser>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validationLoginForm,
      onSubmit: handleLoginUser,
    });

  return (
    <form className="login-form form" onSubmit={handleSubmit}>
      <Input
        placeholder="Email"
        name="email"
        value={values.email}
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.email}
      />

      <Input
        placeholder="Password"
        name="password"
        value={values.password}
        label="Password"
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.password}
        type="password"
      />
      <Button type="submit" disabled={loading}>
        Login
      </Button>
    </form>
  );
};
