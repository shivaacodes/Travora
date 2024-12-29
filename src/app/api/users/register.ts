//API Route from User Registration
import { NextApiRequest, NextApiResponse } from "next";
import { validateUser } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Initialize Prisma Client to connect with the database

// Function to hash the password securely
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10); // Generate a salt for the password
  return bcrypt.hash(password, salt); // Return the hashed password using the salt
}

// Function to save the user to the database
async function saveUserToDatabase(userData: {
  name: string;
  email: string;
  username: string;
  passwordHash: string;
}) {
  try {
    // Create a new user record in the database using Prisma Client
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        username: userData.username,
        passwordHash: userData.passwordHash, // Save the hashed password
      },
    });
    return user; // Return the created user object
  } catch {
    throw new Error("Error saving user to database");
  }
}

export default async function handler(
  req: NextApiRequest, // Type of incoming request
  res: NextApiResponse // Type of outgoing response
) {
  // Check if the request method is POST (this route is for user registration) only POST is possible
  if (req.method === "POST") {
    const userInput = req.body; // Get user input from the request body

    // Validate the user input using the Zod validation schema- validateUser
    const validationResult = validateUser(userInput);

    // If validation is successful
    if (validationResult.success) {
      try {
        // Hash the password before saving to the database
        const hashedPassword = await hashPassword(
          validationResult.data.password
        );

        // Save the user data (with the hashed password) to the database
        await saveUserToDatabase({
          name: validationResult.data.name,
          email: validationResult.data.email,
          username: validationResult.data.username,
          passwordHash: hashedPassword, // Pass the hashed password
        });

        // Send a success response back to the client
        res.status(201).json({ message: "User registered successfully" });
      } catch {
        // If there is an error saving the user to the database, send a 500 error
        res.status(500).json({ error: "Error saving user to database" });
      }
    } else {
      // If validation fails, send a 400 error with the validation error messages
      res.status(400).json({ error: validationResult.error.errors });
    }
  } else {
    // If the request method is not POST, send a 405 Method Not Allowed error
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
