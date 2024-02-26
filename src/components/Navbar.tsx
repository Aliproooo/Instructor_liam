import React from "react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "./ui/button";

import { Logout } from "./Logout";
import Link from "next/link";
import ThemeToggle from "./ThemeToggleDropDown";

type Props = {};

async function Navbar({}: Props) {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();
  const isMerchant = await getPermission("user:merchant");
  console.log(user);
  return (
    <div className="flex items-center z-[1000] justify-between p-5 top-0 fixed w-full bg-black">
      <Link
        href="/"
        className="text-xl font-extrabold text- items-center justify-center flex flex-col"
      >
        <h1 className="">Branyard</h1>
        <h1 className="">Recs</h1>
      </Link>

      <div className="flex items-center space-x-8">
        {isMerchant?.isGranted && (
          <Link href="/dashboard">
            <Button variant={"outline"}>Dashboard</Button>
          </Link>
        )}
        {user ? (
          <>
            <Link href="/bookings">
              <Button variant={"outline"}>Bookings</Button>
            </Link>
            <div className="flex items-center justify-center space-x-3">
              <Logout user={user} />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center space-x-5">
            <LoginLink>
              <Button variant="default">Sign in</Button>
            </LoginLink>
            <RegisterLink postLoginRedirectURL="/">
              <Button variant="secondary">Sign up</Button>
            </RegisterLink>
          </div>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Navbar;
