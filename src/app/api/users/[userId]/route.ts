//GET /api/users/[userId] → Fetch public data for a specific user.

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Helper function to fetch user by ID from database
const fetchUserById = async (id: number) => {
  return prisma.user.findUnique({
    //unique id
    where: { id },
  });
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } } //ts
) {
  const userId = parseInt(params.id, 10); // Convert id to number

  if (isNaN(userId)) {
    //Not a Number
    return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
  }

  const user = await fetchUserById(userId);

  if (!user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    email: user.email,
  });
}
