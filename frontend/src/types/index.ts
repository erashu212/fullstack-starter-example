export type User = {
  id?: string;
  email: string;
  password: string;
  token?: string;
};

export type Option = {
  value: string;
  label: string;
  id?: string| number;
};

export enum Priority {
  P1 = "P1",
  P2 = "P2",
  P3 = "P3",
  P4 = "P4",
  P5 = "P5",
}

export enum Status {
  Open = "Open",
  InProgress = "In Progress",
  InVerification = "In Verification",
  Close = "Closed",
}

export type Task = {
  id?: string;
  name: string;
  due: string;
  priority?: Priority;
  status: Status;
  assignee: string;
  reporter: string;
};



export type LoginUser = Pick<User, "email" | "password">;
export type RegisterUser = User;

export type Reducer<S, A> = (state: S, action: A) => S;

export type CombinedState<S> = {
  [K in keyof S]: S[K];
};
export type CombinedAction<A extends { [key: string]: any }> = Extract<
  A[keyof A],
  { type: string }
>;

export type CombinedReducer<S, A extends { [key: string]: any }> = {
  [K in keyof S]: Reducer<S[K], CombinedAction<A>>;
};

export type UserState = {
  loading: boolean;
  error: unknown;
  data: LoginUser | RegisterUser | null;
};

export type CommonState = {
  loading: boolean;
  error: unknown;
  data: {
    states: Option[];
    cities: Option[];
  };
};

export type State = {
  user: UserState;
  common: CommonState;
};

export type CommonAction = {
  type: string;
  payload?: Array<Record<string, string>> | Error;
};

export type UserAction = {
  type: string;
  payload?:  unknown;
};

export type TaskAction = UserAction

export type Action = CombinedAction<{
  user: UserAction;
  common: CommonAction;
}>;
