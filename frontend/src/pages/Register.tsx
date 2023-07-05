import { useEffectIf, useForm } from "src/hooks";
import { RegisterUser } from "src/types";
import { validationRegisterForm } from "src/data/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import Input from "src/components/Input";
import Button from "src/components/Button";
import { useAuthContext } from "src/context";
import { useNavigate } from "react-router-dom";
import Service from "src/data/services";

export const Register = () => {
  const navigate = useNavigate();
  const { handleAuthentication } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleRegisterUser = useCallback(
    async (values: RegisterUser) => {
      try {
        const result = await Service.register(values);
        if (result?.token) {
          handleAuthentication(result?.token);
          navigate("/");
        }
      } catch {
      } finally {
        setLoading(false);
      }
    },
    [handleAuthentication, navigate]
  );

  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useForm<RegisterUser>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validationRegisterForm,
      onSubmit: handleRegisterUser,
    });

  return (
    <form className="register-form form" onSubmit={handleSubmit}>
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
        Register
      </Button>
    </form>
  );
};
