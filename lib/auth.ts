import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";

export const auth = betterAuth({
  baseURL: "http://localhost:3000/",
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [dash()],
});
