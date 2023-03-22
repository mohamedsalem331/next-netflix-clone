import React, { useState, useEffect } from "react";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsChevronUp, BsSearch, BsBell } from "react-icons/bs";
import Mobilemenu from "./Mobilemenu";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackGround, setShowBackGround] = useState(false);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  const toggleAccountMenu = () => setShowAccountMenu(!showAccountMenu);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackGround(true);
      } else {
        setShowBackGround(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="w-full fixed z-40">
        <div
          className={`px-4  md:px-16 py-6 flex flex-row items-center transition duration-500 ${
            showBackGround && "bg-zinc-900 bg-opacity-90"
          }`}
        >
          <img className="h-5 lg:h-8" src="/images/logo.png" alt="logo" />
          <div className=" flex-row ml-8 gap-7 hidden lg:flex">
            <NavbarItem label="Home" />
            <NavbarItem label="Series" />
            <NavbarItem label="Films" />
            <NavbarItem label="New & Popular" />
            <NavbarItem label="My List" />
            <NavbarItem label="Browse by Languages" />
          </div>
          <div
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
          >
            <p className="text-white text-sm">Browse</p>
            <BsChevronDown className="text-white transition" />
            <Mobilemenu visible={showMobileMenu} />
          </div>
          <div className="flex flex-row ml-auto items-center gap-5">
            <div className="text-white hover:text-gray-300 cursor-pointer">
              <BsSearch />
            </div>
            <div className="text-white hover:text-gray-300 cursor-pointer">
              <BsBell />
            </div>
            <div
              onClick={toggleAccountMenu}
              className="flex flex-row items-center gap-2 cursor-pointer relative"
            >
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <img src="/images/default-red.png" alt="logo" />
              </div>

              <BsChevronDown
                className={`text-white transition ${
                  showAccountMenu ? "rotate-180" : "rotate-0"
                }`}
              />
              <AccountMenu visible={showAccountMenu} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
