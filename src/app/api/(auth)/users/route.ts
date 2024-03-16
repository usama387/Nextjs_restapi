import { NextResponse, userAgent } from "next/server";
import connectToDb from "@/lib/db";
import User from "@/lib/modals/user";
import { Types } from "mongoose";

// #4 A variable to check if an id is valid or not
const ObjectId = require("mongoose").Types.ObjectId;

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

// #3 Now the rest api for PATCH at first inside try block it awaits for the body of through which it takes userId whose data needs to be updated along with the data that will be updated then it connects with the db and checks if the received userId and username are available or not and after that it checks if they are valid or not and after i also check if this user already exits or not and then updates it and after that it checks if there is no success after all these conditions are met i then return a success message response
export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, newUsername } = body;

    await connectToDb();

    if (!userId || !newUsername) {
      return new NextResponse(
        JSON.stringify({
          message: "Id and new Username are required to update",
        }),
        {
          status: 404,
        }
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid userId" }), {
        status: 404,
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { username: newUsername }
    );

    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({ message: "User not found or couldn't update" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "User updated successfully",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error updating username",
      }),
      {
        status: 500,
      }
    );
  }
};
