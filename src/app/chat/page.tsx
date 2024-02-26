import Chat from "@/components/Chat";
import React from "react";
import axios from "axios";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

async function getSendBirdUser(user: KindeUser) {
  try {
    console.log(user);
    const res = await axios.get(
      `https://api-E17BA224-2245-437E-8D33-BD12EDD46959.sendbird.com/v3/users/${user.id}`,
      {
        headers: {
          "Api-Token": "fdcec0b2794362c369dae01f45c28f4a1948bb7d",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return res.data.user_id;
  } catch (err) {
    console.log(err);
    const res = await axios.post(
      `https://api-E17BA224-2245-437E-8D33-BD12EDD46959.sendbird.com/v3/users`,
      {
        user_id: user.id,
        nickname: `${user.given_name} ${user.family_name}`,
        profile_url: user.picture,
      },
      {
        headers: {
          "Api-Token": "fdcec0b2794362c369dae01f45c28f4a1948bb7d",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("err", err);
    return res.data.user_id;
  }
}

async function page() {
  const { isAuthenticated, getPermission, getUser } = getKindeServerSession();
  if (!isAuthenticated) {
    redirect("/api/auth/login");
  }

  const user = await getUser();
  if (!user) {
    redirect("/");
  }

  const user_id = await getSendBirdUser(user);

  return (
    <div style={{ height: "90vh", width: "100vw" }}>
      <Chat id={user_id} />
    </div>
  );
}

export default page;
