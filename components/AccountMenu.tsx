import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import React from "react";

interface AccountMenuProps {
  visible: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser();
  if (!visible) {
    return <></>;
  }
  console.log(data);

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="group/item px-3 flex flex-row gap-3 items-center w-full">
          <img
            className="h-8 rounded-md"
            src="/images/default-red.png"
            alt="profile"
          />
          <p className="text-white text-sm group-hover/item:underline">
            {data?.currUser?.name}
          </p>
        </div>
        <hr className="bg-gray-400 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign Out Now
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
