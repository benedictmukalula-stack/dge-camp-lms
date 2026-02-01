import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "@/lib/db";

// Central NextAuth configuration. Uses Credentials provider backed by
// the Supabase Postgres database via DATABASE_URL.
// NOTE: This runs only at request time (e.g. sign-in), not at build.
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Basic example: look up the user by email.
        // You should use a proper password hash check in production.
        const result = await query(
          `select u.id, u.email, r.slug as role
           from public.users u
           left join public.user_roles ur on ur.user_id = u.id
           left join public.roles r on r.id = ur.role_id
           where u.email = $1
           limit 1`,
          [credentials.email]
        );

        const row = result.rows[0] as {
          id: string;
          email: string;
          role: string | null;
        } | undefined;
        if (!row) {
          return null;
        }

        return {
          id: row.id,
          email: row.email,
          role: row.role,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user && (user as any).role) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        (session.user as any).role = token.role ?? null;
      }
      return session;
    },
  },
};
