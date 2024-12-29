import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.string().email("Invalid email format"),

  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(15, "Username must not exceed 15 characters"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Define the type for the user input
export type UserInput = {
  name: string;
  email: string;
  username: string;
  password: string;
};

// Validate the user input against the schema
export const validateUser = (userInput: UserInput) => {
  return userSchema.safeParse(userInput); // Return validation result
};
