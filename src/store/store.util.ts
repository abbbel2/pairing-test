export type ApiState<T> = {
  loading: boolean;
  payload: T;
  successful: boolean;
  error: any;
};

export const ResetApiState = (payload: any) => ({
  loading: false,
  payload,
  successful: false,
  error: null,
});

export const ResetCurrentUser = () => {
  //   const userData = ;
  //   return {
  //     token: userData?.token,
  //     id: userData?.id,
  //     full_name: userData?.full_name,
  //     email: userData?.email,
  //     phone_number: userData?.phone_number,
  //     role: userData?.role,
  //     image: userData?.image,
  //     chat_id: userData?.chat_id,
  //   };
};
