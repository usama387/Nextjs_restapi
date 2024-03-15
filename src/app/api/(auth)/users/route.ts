import { NextResponse } from "next/server";
import connectToDb from "@/lib/db";
import User from "@/lib/modals/user";

// #1 A predefined function api with GET request for fetching users in the db
export const GET = async () => {
  try {
    await connectToDb();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching users" + error, { status: 500 });
  }
};


