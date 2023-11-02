import { useMutation } from "react-query";
import { requestWithoutAuth } from "../../services/api";

type LoginType = {
  username: string;
  password: string;
};

export const useLoginMutation = () => {
  return useMutation(({ data }: { data: LoginType }) =>
    requestWithoutAuth.post(`/users/auth`, data)
  );
};
