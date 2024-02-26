import { Edit, Eye } from "lucide-react";
import Link from "next/link";
import React from "react";
import { headers } from "next/headers";

type Props = {};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const heads = headers();

  const pathname = heads.get("next-url");
  const isActive = pathname === "/admin/artist/request";

  const activeClass = isActive ? "text-secondary bg-primary" : "";

  return (
    <main className="flex space-x-3 ">
      <div className="flex flex-col  border-t-2 border-r-2 py-10 min-w-max min-h-screen px-3">
        <Link
          href="/dashboard/artist/landing-page"
          className={`text-xl group font-bold hover:bg-primary duration-300 transition-all bg-primary/10 px-3 py-3 `}
        >
          <div className="flex space-x-2 items-center">
            <Edit
              className={`group-hover:text-secondary duration-300 transition-all `}
            ></Edit>
            <span
              className={`group-hover:text-secondary duration-300 transition-all `}
            >
              Manage Landing Page
            </span>
          </div>
        </Link>
        <Link
          href="/dashboard/artist/cover"
          className={`text-xl mt-10 group font-bold hover:bg-primary duration-300 transition-all bg-primary/10 px-3 py-3 `}
        >
          <div className="flex space-x-2 items-center">
            <Edit
              className={`group-hover:text-secondary duration-300 transition-all `}
            ></Edit>
            <span
              className={`group-hover:text-secondary duration-300 transition-all `}
            >
              Add Cover Pic
            </span>
          </div>
        </Link>
        <Link
          href="/dashboard/artist/profile"
          className={`text-xl mt-10 group font-bold hover:bg-primary duration-300 transition-all bg-primary/10 px-3 py-3 `}
        >
          <div className="flex space-x-2 items-center">
            <Edit
              className={`group-hover:text-secondary duration-300 transition-all `}
            ></Edit>
            <span
              className={`group-hover:text-secondary duration-300 transition-all `}
            >
              Add Profile Pic
            </span>
          </div>
        </Link>
        <Link
          href="/dashboard/artist/keypoint"
          className={`text-xl group mt-10 font-bold hover:bg-primary duration-300 transition-all bg-primary/10 px-3 py-3 `}
        >
          <div className="flex space-x-2 items-center">
            <Edit
              className={`group-hover:text-secondary duration-300 transition-all `}
            ></Edit>
            <span
              className={`group-hover:text-secondary duration-300 transition-all `}
            >
              Manage Key Points
            </span>
          </div>
        </Link>

        <Link
          href="/dashboard/artist/FaQ"
          className={`text-xl group mt-10 font-bold hover:bg-primary duration-300 transition-all bg-primary/10 px-3 py-3 `}
        >
          <div className="flex space-x-2 items-center">
            <Edit
              className={`group-hover:text-secondary duration-300 transition-all `}
            ></Edit>
            <span
              className={`group-hover:text-secondary duration-300 transition-all `}
            >
              Manage FaQs
            </span>
          </div>
        </Link>

        <Link
          href="/dashboard/artist/review"
          className={`text-xl group mt-10 font-bold hover:bg-primary duration-300 transition-all bg-primary/10 px-3 py-3 `}
        >
          <div className="flex space-x-2 items-center justify-center">
            <Edit
              className={`group-hover:text-secondary duration-300 transition-all `}
            ></Edit>
            <span
              className={`group-hover:text-secondary duration-300 transition-all `}
            >
              Add Review to Landing Page
            </span>
          </div>
        </Link>

        <Link
          href="/dashboard/artist/session"
          className={`text-xl group mt-10 font-bold hover:bg-primary duration-300 transition-all bg-primary/10 px-3 py-3 `}
        >
          <div className="flex space-x-2 items-center ">
            <Edit
              className={`group-hover:text-secondary duration-300 transition-all `}
            ></Edit>
            <span
              className={`group-hover:text-secondary duration-300 transition-all `}
            >
              Manage Session Price
            </span>
          </div>
        </Link>
        <Link
          href="/dashboard/artist/order"
          className={`text-xl group mt-10 font-bold hover:bg-primary duration-300 transition-all bg-primary/10 px-3 py-3 `}
        >
          <div className="flex space-x-2 items-center ">
            <Edit
              className={`group-hover:text-secondary duration-300 transition-all `}
            ></Edit>
            <span
              className={`group-hover:text-secondary duration-300 transition-all `}
            >
              View Orders
            </span>
          </div>
        </Link>
      </div>
      {children}
    </main>
  );
}
