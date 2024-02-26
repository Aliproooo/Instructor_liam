"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

type Props = {
  user: KindeUser | null;
};

export function Logout({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          {user?.picture && (
            <>
              <Image
                alt="profile picture"
                src={user?.picture}
                width={50}
                height={50}
                className="rounded-full mx-auto my-2"
              />
            </>
          )}
          {user && !user?.picture && user?.family_name && (
            <div className="h-[50px] w-[50px] flex items-center justify-center bg-primary rounded-full text-secondary">
              {user?.family_name[0]}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>
          {user?.given_name} {user?.family_name}
        </DropdownMenuLabel>
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <LogoutLink>Log out</LogoutLink>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
