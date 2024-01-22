import { useQuery } from "react-query";
import { request } from "../../../services/api";

export const useAllWellOptionsQuery = (enabled: boolean) => {
  return useQuery<any>(
    [["get-all-well-options"]],
    async () => {
      const { data } = await request.get("/well/?RecID=-1");

      return data;
    },
    { enabled: enabled }
  );
};
