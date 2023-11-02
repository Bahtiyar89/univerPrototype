import { useQuery } from "react-query";
import { request } from "../../../services/api";

interface Params {
  result?: string;
  branchId?: string;
  fromDate?: string;
  toDate?: string;
  enabled?: boolean;
}
export const useDemoListQuery = (params: Params) => {
  return useQuery(
    ["get-list-demos", params.result],
    async () => {
      const { data } = await request.get(`/demos`, {
        params: params,
      });

      return data;
    },
    { enabled: params.enabled }
  );
};
