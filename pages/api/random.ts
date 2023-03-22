import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import Prismadb from "@/lib/prismadb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).end;

  try {
    await serverAuth(req);

    const movieCount = await Prismadb.movie.count();
    const randomIdx = Math.floor(Math.random() * movieCount);
    const randomMovies = await Prismadb.movie.findMany({
      take: 1,
      skip: randomIdx,
    });

    return res.status(200).send(randomMovies[0]);
  } catch (error) {
    return res.status(400).end;
  }
};

export default handler;
