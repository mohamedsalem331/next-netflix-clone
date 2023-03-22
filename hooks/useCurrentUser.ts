import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const currentUser = () => {
  const swrFetcherHooks = useSWR("/api/current", fetcher);
  return { ...swrFetcherHooks };
};

export default currentUser;
