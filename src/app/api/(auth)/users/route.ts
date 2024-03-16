import { NextResponse, userAgent } from "next/server";
import connectToDb from "@/lib/db";
import User from "@/lib/modals/user";

// #1 A predefined function api with GET request for fetching users in the db at first it connects with db and then find all users with find query and then returns the Next Response if there is an error it returns the error
export const GET = async () => {
  try {
    await connectToDb();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching users" + error, { status: 500 });
  }
};

// #2 Now the api for POST request at first it awaits for the data from client after that it connects with the database then it creates the new user with the data received and after we save the user
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connectToDb();
    const newUser = new User(body);
    await newUser.save();

    return new NextResponse(
      JSON.stringify({ message: "User is created", user: newUser }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse("Error in creating users" + error, { status: 500 });
  }
};
