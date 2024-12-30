//thsi API Route contains the option for google provider and credentials
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  //google providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    //credential login from database- email and password
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          //optional chaining
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            return null; // User not found
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );

          if (!passwordMatch) {
            throw new Error("Invalid password");
          }

          return user as User; // Explicitly cast to User type
        } catch (error) {
          console.error(error);
          throw new Error("Internal server error");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email as string;
        token.id = String(account.id);
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
      };
    },
    async signIn({ account, profile }) {
      try {
        if (account?.provider === "google") {
          if (profile?.email) {
            // Check if profile and email are defined
            let user = await prisma.user.findUnique({
              where: { email: profile.email },
            });

            if (!user) {
              // Create a new user if not found
              user = await prisma.user.create({
                data: {
                  email: profile.email,
                  name: profile?.name || "", // Handle potential null/undefined values safely
                  username: profile?.email.split("@")[0], // Generate a username from the email
                  passwordHash: "", // No password hash for Google sign-ins
                  provider: "google", // Store provider information for the user
                },
              });
            }
          } else {
            throw new Error("Google profile does not contain an email");
          }
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};
