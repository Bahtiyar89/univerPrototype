import { useQuery } from "react-query";
import { request } from "../../../services/api";

export const useSystemParametersOptionsQuery = ({
  enabled,
}: {
  enabled?: boolean;
}) => {
  return useQuery(
    ["get-systen-dictionary-options"],
    async () => {
      const { data } = await request.get("/dictionary/?RecID=-1");

      return data;
    },
    { enabled: enabled }
  );
};
