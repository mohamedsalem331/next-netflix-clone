import { NextPageContext } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import Movielist from "@/components/Movielist";
import useMovieList from "@/hooks/useMovieList";
import InfoModal from "@/components/Infomodal";
import useInfoModalStore from "@/hooks/useInfoModal";

export default function Home() {
  const { data } = useMovieList();
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <Movielist title="Trending Now" data={data?.movies} />
      </div>
    </>
  );
}

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
