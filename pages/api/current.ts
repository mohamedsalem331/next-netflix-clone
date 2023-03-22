import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).end;

  try {
    const { currUser } = await serverAuth(req);

    return res.status(200).send({ currUser });
  } catch (error) {
    return res.status(400).end;
  }
};

export default handler;
