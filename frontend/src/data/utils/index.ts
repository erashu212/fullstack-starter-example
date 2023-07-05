import { Reducer } from "react";
import { ValidationRules } from "src/hooks";
import {
  CombinedAction,
  CombinedReducer,
  CombinedState,
  LoginUser,
  Priority,
  RegisterUser,
  Status,
  Task,
} from "src/types";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(0), ms));

export const generateToken = () => Math.random().toString(36);

export const validationRegisterForm: ValidationRules<RegisterUser> = {
  email: (value) => {
    if (!value) {
      return "Email is required";
    }
    const result = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);
    if (!result) return "Email is not valid.";

    return "";
  },
  password: (value) => {
    if (!value) {
      return "Password is required";
    }

    return "";
  },
};
export const validationLoginForm: ValidationRules<LoginUser> = {
  email: (value) => {
    if (!value) {
      return "Email is required";
    }
    const result = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);
    if (!result) return "Email is not valid.";

    return "";
  },
  password: (value) => {
    if (!value) {
      return "Password is required";
    }

    return "";
  },
};
export const validateTaskForm: ValidationRules<Task> = {
  name: (value) => {
    if (!value) {
      return "Name is required";
    }
    return "";
  },
  due: (value) => {
    if (!value) {
      return "Due date is required";
    }

    return "";
  },
  assignee: (value) => {
    if (!value) {
      return "Assignee is required";
    }

    return "";
  },
  reporter: (value) => {
    if (!value) {
      return "Reporter is required";
    }

    return "";
  },
  status: (value) => {
    if (!value) {
      return "Status is required";
    }

    return "";
  },
  priority: (value) => {
    if (!value) {
      return "Priority is required";
    }

    return "";
  },
};

export function combineReducers<S, A extends { [key: string]: any }>(
  reducers: CombinedReducer<S, A>
): Reducer<CombinedState<S>, CombinedAction<A>> {
  return (state: CombinedState<S>, action: CombinedAction<A>) => {
    const nextState: CombinedState<S> = {} as CombinedState<S>;

    for (const key in reducers) {
      if (reducers.hasOwnProperty(key)) {
        nextState[key] = reducers[key](state[key], action);
      }
    }

    return nextState;
  };
}

export const useFetch = async <T>(
  url: string,
  requestOptions: RequestInit
): Promise<{
  data: T;
  status: number;
}> => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  const mergedHeaders = {
    ...defaultHeaders,
    ...(requestOptions?.headers || {}),
  };
  requestOptions.headers = mergedHeaders;

  const response = await fetch(url, requestOptions);
  const data: T = await response.json();

  if (!response.ok) {
    return Promise.reject({ data, status: response.status });
  }
  return { data, status: response.status };
};
