import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username: string;
  }

  interface Session {
    user: {
      id: string | unknown; //remove type safety( not good)
      username: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    id: string;
    email: string;
    username: string;
  }
}
