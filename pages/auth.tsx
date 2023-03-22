import Input from "@/components/Input";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

enum VARIANT {
  LOGIN = "login",
  REGISTER = "register",
}

const auth = () => {
  const [email, setEmail] = useState("");
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === VARIANT.LOGIN ? VARIANT.REGISTER : VARIANT.LOGIN
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profile",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      await login();
    } catch (error: any) {
      console.log(error.message);
    }
  }, [email, password, name]);

  return (
    <>
      <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
          <nav className="px-12 py-5">
            <img className="h-14" src="/images/logo.png" alt="logo" />

            <div className="flex justify-center">
              <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                <h2 className="text-white text-4xl font-semibold mb-8">
                  {variant === VARIANT.LOGIN ? "Sign In" : "Register"}
                </h2>
                <div className="flex flex-col gap-4">
                  {variant === VARIANT.REGISTER && (
                    <Input
                      label="Username"
                      onChange={(e: any) => {
                        setUsername(e.target.value);
                      }}
                      id="username"
                      type="username"
                      value={name}
                    />
                  )}
                  <Input
                    label="Email"
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                    }}
                    id="email"
                    type="email"
                    value={email}
                  />
                  <Input
                    label="Password"
                    onChange={(e: any) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                    type="password"
                    value={password}
                  />
                </div>
                <button
                  onClick={variant === VARIANT.LOGIN ? login : register}
                  className="bg-netflix-red py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
                >
                  {variant === VARIANT.LOGIN ? "Login" : "Sign Up"}
                </button>
                <div
                  onClick={() => signIn("google", { callbackUrl: "/profile" })}
                  className="flex flex-row items-center justify-center gap-3 mt-8"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition">
                    <FcGoogle size={30} />
                  </div>

                  <div
                    onClick={() =>
                      signIn("github", { callbackUrl: "/profile" })
                    }
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition"
                  >
                    <FaGithub size={30} />
                  </div>
                </div>

                <p className="text-neutral-500 mt-12">
                  New to Netflix?
                  <span
                    onClick={toggleVariant}
                    className="text-white ml-1 hover:underline cursor-pointer"
                  >
                    Sign Up now.
                  </span>
                </p>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default auth;
