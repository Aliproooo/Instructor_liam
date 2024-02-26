import { Eye } from "lucide-react";
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

  return (
    <main className="flex space-x-3 justify-between">
      <div className="flex flex-col bg-secondary py-10 min-w-max h-screen px-3">
        <Link
          href="/admin"
          className={`text-xl group font-bold hover:bg-primary duration-300 transition-all bg-primary/10 px-3 py-3 `}
        >
          <div className="flex space-x-2 items-center justify-center">
            <Eye
              className={`group-hover:text-secondary duration-300 transition-all `}
            ></Eye>
            <span
              className={`group-hover:text-secondary duration-300 transition-all `}
            >
              View Dashboard
            </span>
          </div>
        </Link>
        <Link
          href="/admin/artist/request"
          className={`text-xl group font-bold hover:bg-primary duration-300 transition-all bg-primary/10 px-3 py-3 mt-10 `}
        >
          <div className="flex space-x-2 items-center justify-center">
            <Eye
              className={`group-hover:text-secondary duration-300 transition-all `}
            ></Eye>
            <span
              className={`group-hover:text-secondary duration-300 transition-all `}
            >
              View Artist Request
            </span>
          </div>
        </Link>
        <Link
          href="/admin/order"
          className={`text-xl group font-bold hover:bg-primary duration-300 transition-all bg-primary/10 px-3 py-3 mt-10 `}
        >
          <div className="flex space-x-2 items-center justify-center">
            <Eye
              className={`group-hover:text-secondary duration-300 transition-all `}
            ></Eye>
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
