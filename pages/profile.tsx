import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

const profile: React.FC = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-6xl text-center text-white font-semibold">
          Who's watching?
        </h1>
        <div
          onClick={() => router.push("/")}
          className="group mt-10 flex flex-col justify-center items-center gap-4"
        >
          <div className="w-44 h-44 rounded-md border-2 border-transparent group-hover:cursor-pointer transition group-hover:border-white overflow-hidden">
            <img src="/images/default-red.png" alt="profile-img" />
          </div>
          <span className="text-lg text-gray-400 text-center transition group-hover:text-white">
            {user?.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default profile;
