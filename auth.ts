import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AUTHOR_BY_AUTH_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
          access_type: "offline",
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_AUTH_ID_QUERY, {
          id: profile?.id || profile?.sub,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile?.id || profile?.sub,
          name: profile?.name,
          username: profile?.login || profile?.email?.split("@")[0],
          email: profile?.email,
          image: profile?.avatar_url || profile?.picture,
          bio: profile?.bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const userId = profile?.id || profile?.sub;
        // console.log(userId);

        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_AUTH_ID_QUERY, {
            id: userId,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, token);
      return session;
    },
  },
});
