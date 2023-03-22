import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useMovie = (id?: string) => {
  const swrFetcherHooks = useSWR(`/api/movies/${id}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  return { ...swrFetcherHooks };
};

export default useMovie;
