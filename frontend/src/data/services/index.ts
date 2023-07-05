import { LoginUser, RegisterUser, Task, User } from "src/types";
import { useFetch } from "../utils";

const BASE_URL = "http://localhost:8080/";

type ErrorResponse = {
  data: unknown;
  message: string;
};

type APIResponse = { data: { data: unknown } };

const raiseAlert = (message: string) => {
  const customEvent = new CustomEvent("renderComponent", {
    detail: { severity: "error", title: "Error", message },
  });
  document.dispatchEvent(customEvent);
};
class ApiService {
  private static instance: ApiService;

  login = async ({ email, password }: LoginUser): Promise<User> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/login`,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({ email, password }),
        }
      );
      return response?.data as unknown as User;
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data);
    }
  };

  register = async ({ email, password }: RegisterUser): Promise<User> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/register`,
        {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );
      return response?.data as unknown as User;
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data);
    }
  };

  logout = async (): Promise<unknown | Error> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/logout`,
        {
          mode: "cors",
          method: "DELETE",
          headers: {
            Authorization: sessionStorage.getItem("user_auth_token") ?? "",
          },
        }
      );
      return response?.data;
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data || false);
    }
  };

  addTask = async (payload: Task): Promise<boolean> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/task`,
        {
          mode: "cors",
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            Authorization: sessionStorage.getItem("user_auth_token") ?? "",
          },
        }
      );
      return response?.data as unknown as boolean;
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data || false);
    }
  };

  updateTask = async (id: string, payload: Task): Promise<boolean> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/task/${id}`,
        {
          mode: "cors",
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            Authorization: sessionStorage.getItem("user_auth_token") ?? "",
          },
        }
      );
      return response?.data as unknown as boolean;
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data || false);
    }
  };

  deleteTask = async (id: string): Promise<boolean> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/task/${id}`,
        {
          mode: "cors",
          method: "DELETE",
          headers: {
            Authorization: sessionStorage.getItem("user_auth_token") ?? "",
          },
        }
      );
      return response?.data as unknown as boolean;
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data || false);
    }
  };

  getAllTask = async (): Promise<Task[]> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/task/`,
        {
          mode: "cors",
          method: "GET",
          headers: {
            Authorization: sessionStorage.getItem("user_auth_token") ?? "",
          },
        }
      );
      return (response?.data || []) as unknown as Task[];
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data || []);
    }
  };

  getTaskById = async (id: string): Promise<Task> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/task/${id}`,
        {
          mode: "cors",
          method: "GET",
          headers: {
            Authorization: sessionStorage.getItem("user_auth_token") ?? "",
          },
        }
      );
      return response?.data as unknown as Task;
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data);
    }
  };

  getUsers = async (): Promise<User[]> => {
    try {
      const { data: response }: APIResponse = await useFetch(
        `${BASE_URL}api/users`,
        {
          mode: "cors",
          method: "GET",
          headers: {
            Authorization: sessionStorage.getItem("user_auth_token") ?? "",
          },
        }
      );
      return (response?.data || []) as unknown as User[];
    } catch (err: any) {
      raiseAlert((err?.data as unknown as ErrorResponse)?.message);
      return Promise.reject((err as unknown as ErrorResponse)?.data || []);
    }
  };

  public static getInsance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }
}

const instance = ApiService.getInsance();
export default instance;
