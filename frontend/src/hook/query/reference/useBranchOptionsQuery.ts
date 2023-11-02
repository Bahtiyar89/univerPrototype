import { useQuery } from "react-query";
import { request } from "../../../services/api";

export const useBranchOptionsQuery = ({
  enabled,
  page,
}: {
  enabled?: boolean;
  page?: number;
}) => {
  return useQuery(
    ["get-reference-branche-options"],
    async () => {
      const { data } = await request.get(
        `/reference/branches/as-options`,
        {
          params: { page },
        }
      );

      return data;
    },
    { enabled: enabled }
  );
};


