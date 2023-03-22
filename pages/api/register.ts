import { NextApiRequest, NextApiResponse } from "next";
import Prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { email, password, name } = req.body;
    const hashedPass = await hash(password, 10);

    const user = await Prismadb.user.create({
      data: {
        name,
        email,
        password: hashedPass,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(201).send({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
