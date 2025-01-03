import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Add bcrypt to hash and compare passwords

const prisma = new PrismaClient();

// Helper function to fetch user by username
const fetchUserByUsername = async (username: string) => {
  return prisma.user.findUnique({
    where: { username },
  });
};

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Fetch user by username
    const user = await fetchUserByUsername(username);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Return user details without password
    const { passwordHash: _, ...userData } = user;

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
