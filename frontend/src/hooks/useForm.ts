import { useEffect, useState } from "react";

export interface FormErrors {
  [key: string]: string;
}

export type ValidationRules<T> = {
  [K in keyof T]: (value: T[K]) => string;
};

export interface FormOptions<T> {
  initialValues?: T;
  onSubmit: (values: T) => void;
  validate?: ValidationRules<T>;
}

export const useForm = <T extends Record<string, string>>({
  initialValues = {} as T,
  onSubmit,
  validate,
}: FormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (validate && validate[name as keyof T]) {
      const error = validate[name as keyof T](value as T[keyof T]);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate) {
      const formErrors: FormErrors = {};
      Object.keys(validate).forEach((fieldName) => {
        const error = validate[fieldName as keyof T](
          values[fieldName as keyof T]
        );
        if (error) {
          formErrors[fieldName] = error;
        }
      });
      setErrors(formErrors);
      if (Object.keys(formErrors).length === 0) {
        onSubmit(values);
      }
    } else {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setErrors,
  };
};
