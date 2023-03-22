import { getServerSession } from "next-auth/next";
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import Prismadb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("Not Signed In");
  }

  const currUser = await Prismadb.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currUser) throw new Error("Invalid User");

  return { currUser };
};
export default serverAuth;
