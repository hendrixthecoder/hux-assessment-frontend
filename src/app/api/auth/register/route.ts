import { createCookieWith, SERVER_URL } from "@/lib";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const {
      data: { user, token },
    } = await axios.post(`${SERVER_URL}/users/register`, body);

    const serializedCookie = createCookieWith(token);

    return new Response(JSON.stringify(user), {
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
