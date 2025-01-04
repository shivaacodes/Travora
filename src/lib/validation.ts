//Backend Validation using zod
import { z } from "zod";

//name, email, username, password
export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
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
