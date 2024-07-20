import { SERVER_URL } from "@/lib";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = await axios.post(`${SERVER_URL}/users/login`, body);

    return NextResponse.json(response.data, { status: 200 });
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
