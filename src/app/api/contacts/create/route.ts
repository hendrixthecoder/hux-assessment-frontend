import { createCookieWith, SERVER_URL } from "@/lib";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const token = cookies().get("session_token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "No session token found" },
      { status: 401 }
    );
  }

  try {
    const { data } = await axios.post(`${SERVER_URL}/users/contacts`, body, {
      headers: {
        Cookie: `session_token=${token}`,
      },
      withCredentials: true,
    });

    // Refresh user session due to activity
    const serializedCookie = createCookieWith(token);

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: {
        "Set-Cookie": serializedCookie,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      // Extract error details from AxiosError
      const errorData = {
        message: error.message,
        ...(error.response?.data ? { data: error.response.data } : {}),
      };

      return NextResponse.json(errorData, {
        status: error.response?.status ?? 500,
      });
    }

    // Return a generic error if it's not an AxiosError
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
