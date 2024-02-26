import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";

type Props = {};

async function Footer({}: Props) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className=" flex flex-col items-center justify-center py-3 mt-20">
      <div className="flex flex-row items-center justify-between w-full px-5">
        <div className="flex items-center justify-between p-5">
          <Link
            href="/"
            className="text-xl font-extrabold text-primary items-center justify-center flex flex-col"
          >
            <div className="">Branyard</div>
            <div className="">Recs</div>
          </Link>
        </div>
        {user ? (
          <Link href="/register-as-vendor">
            <Button variant="default">Register as a Vendor</Button>
          </Link>
        ) : (
          <div>
            <Button variant="default">
              <LoginLink postLoginRedirectURL="/register-as-vendor">
                Register as a vendor
              </LoginLink>
            </Button>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-center space-x-5">
          <div className="">© 2021 Branyard Recs</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
