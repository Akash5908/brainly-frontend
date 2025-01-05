import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: any; // Add custom properties here
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string | null;
    };
    expires: ISODateString;
  }

  interface JWT {
    accessToken?: string;
  }

  interface DefaultUser {
    token?: string;
  }
}
