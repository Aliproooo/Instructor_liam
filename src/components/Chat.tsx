"use client";
import React from "react";
import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
function Chat({ id }: { id: string }) {
  return (
    <SendbirdApp
      theme="dark"
      appId={"E17BA224-2245-437E-8D33-BD12EDD46959"}
      userId={id}
    />
  );
}

export default Chat;
