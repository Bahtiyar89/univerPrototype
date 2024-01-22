import { useQuery } from "react-query";
import { request } from "../../../services/api";

interface Params {
  wellId?: string;
  docId?: string;
}
export const useWellsListQuery = (
  { wellId, docId }: Params,
  enabled: boolean
) => {
  return useQuery(
    ["get-list-columns"],
    async () => {
      const res = await request.get(
        `/rockparamvalue/?RecWellID=${wellId}&RecDictionaryPropertyID=${docId}`
      );
      return res.data;
    },
    { enabled: enabled }
  );
};
