import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useMovieList = () => {
  const swrFetcherHooks = useSWR("/api/movies", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  return { ...swrFetcherHooks };
};

export default useMovieList;
