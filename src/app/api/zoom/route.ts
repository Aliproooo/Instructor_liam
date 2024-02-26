import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const clientId = "pbtgO8HZTVSbS8v4W1Xqw";
    const clientSecret = "pVYVTNva65Tm6m4FL0yMtA3hZAvrqZ26";
    const credentials = `${clientId}:${clientSecret}`;
    const encodedCredentials = Buffer.from(credentials).toString("base64");

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedCredentials}`,
    };

    const body = {
      grant_type: "account_credentials",
      account_id: "jSXvTOGMSj-4mgEB-O6ihA",
    };

    const response = await axios.post(
      "https://zoom.us/oauth/token",
      new URLSearchParams(body),
      { headers }
    );

    console.log(response);
    return NextResponse.json({ access_token: response.data.access_token });

    // Handle the response
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
