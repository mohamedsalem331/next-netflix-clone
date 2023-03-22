import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useBillBoard = () => {
  const swrFetcherHooks = useSWR("/api/random", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  return { ...swrFetcherHooks };
};

export default useBillBoard;
