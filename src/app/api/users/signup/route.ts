import { NextRequest, NextResponse } from "next/server";
import { validateUser } from "@/lib/validation"; //Backend Validation
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Hashing the data before adding to database
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function saveUserToDatabase(userData: {
  name: string;
  email: string;
  username: string;
  passwordHash: string;
}) {
  try {
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        username: userData.username,
        passwordHash: userData.passwordHash,
        provider: "Credentials",
      },
    });
    return user;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Error saving user to database");
  }
}

export async function POST(req: NextRequest) {
  const userInput = await req.json();
  const validationResult = validateUser(userInput);

  if (validationResult.success) {
    try {
      const hashedPassword = await hashPassword(validationResult.data.password);
      const user = await saveUserToDatabase({
        name: validationResult.data.name,
        email: validationResult.data.email,
        username: validationResult.data.username,
        passwordHash: hashedPassword,
      });

      return NextResponse.json(
        { message: "User registered successfully", user },
        { status: 201 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error saving user to database" },
        { status: 500 }
      );
    }
  } else {
    const errorMessages = validationResult.error.errors
      .map((err) => err.message)
      .join(", ");
    console.error("Validation errors:", errorMessages);
    return NextResponse.json(
      { error: `Validation failed: ${errorMessages}` },
      { status: 400 }
    );
  }
}
