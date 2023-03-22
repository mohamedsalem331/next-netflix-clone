import { isEmpty } from "lodash";
import React from "react";
import MovieCard from "./Moviecard";
import { MovieInterface } from "@/types";

interface MovieListProps {
  data: Array<MovieInterface>;
  title: string;
}

const Movielist: React.FC<MovieListProps> = ({ data, title }) => {
  if (!data?.length) return <></>;

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movielist;