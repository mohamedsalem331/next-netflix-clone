import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import Prismadb from "@/lib/prismadb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).end;

  try {
    await serverAuth(req);

    const id = req.query.movieid;

    if (typeof id !== "string")
      throw new Error("Bad Request, Invalid param id");

    const movie = await Prismadb.movie.findUnique({
      where: { id },
    });

    if (!movie) throw new Error("Movie not found");

    return res.status(200).send({ movie });
  } catch (error) {
    return res.status(400).end;
  }
};

export default handler;
