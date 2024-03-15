import { NextResponse } from "next/server";

// #1 A predefined function for GET request
export const GET = async () => {
    return new NextResponse("This is my first api yep");
};
