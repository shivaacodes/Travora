import { z } from "zod";

// User schema validation
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

// Deal schema validation
export const dealSchema = z.object({
  title: z.string().min(1, "Deal title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0.01, "Price must be a positive value"),
  location: z.string().min(1, "Location is required"),
  dealType: z.enum(["FLIGHT", "HOTEL", "EVENT", "OTHER"]),
  imageURL: z.string().url().optional(),
  userId: z.number().min(1, "User ID is required"),
});

export type UserInput = z.infer<typeof userSchema>;
export type DealInput = z.infer<typeof dealSchema>;

// Validate user input
export const validateUser = (userInput: UserInput) => {
  return userSchema.safeParse(userInput); // Return validation result
};

//Validate Deal Input
export const validateDeal = (dealInput: DealInput) => {
  return dealSchema.safeParse(dealInput); // Return validation result
};
