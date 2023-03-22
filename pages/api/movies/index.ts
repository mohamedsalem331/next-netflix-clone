import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import Prismadb from "@/lib/prismadb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).end;

  try {
    await serverAuth(req);

    const movies = await Prismadb.movie.findMany();

    return res.status(200).send({ movies });
  } catch (error) {
    return res.status(400).end;
  }
};

export default handler;
