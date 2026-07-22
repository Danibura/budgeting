"use client";

import type { LoginForm } from "@/lib/validation";
import { LoginSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import GoogleIcon from "./googleIcon";
import Link from "next/link";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginSchema),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginWithEmail() {
    try {
      setLoading(true);
      setError("");
      const response = await authClient.signIn.email({
        email: getValues("email"),
        password: getValues("password"),
        callbackURL: "/",
        rememberMe: true,
      });

      if (response.error) {
        setError(response.error.message ?? "");
        return;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function loginWithGoogle() {
    try {
      setLoading(true);
      setError("");
      const response = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (response.error) {
        setError(response.error.message ?? "");
        return;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl p-4 mt-40">
      <form
        className="flex flex-col items-center gap-6 p-4 "
        onSubmit={handleSubmit(loginWithEmail)}
      >
        <h1 className="font-bold text-stone-800 text-xl">
          Login to your account
        </h1>
        <div className="flex flex-col gap-1 w-full ">
          <h2 className="text-stone-800 font-bold text-sm">Email</h2>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className=" shadow-sm shadow-stone-500/30 rounded-lg p-2 text-stone-800 text-sm"
            required
          />
          {errors.email && (
            <h2 className="text-sm text-red-500">{errors.email.message}</h2>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full ">
          <h2 className="text-stone-800 font-bold text-sm">Password</h2>
          <input
            type="password"
            placeholder=""
            {...register("password")}
            className=" shadow-sm shadow-stone-500/30 rounded-lg p-2 text-stone-800 text-sm"
            required
          />
          {errors.password && (
            <h2 className="text-sm text-red-500">{errors.password.message}</h2>
          )}
        </div>
        {error && <h2 className="text-sm text-red-500">{error}</h2>}
        <div className="flex flex-col gap-4 w-full mt-4">
          <button
            className="bg-stone-800 text-white p-2 rounded-lg w-full disabled:bg-stone-500"
            type="submit"
            disabled={loading}
          >
            Login
          </button>
          <button
            className="bg-white text-stone-800 border border-stone-800 p-2 rounded-lg w-full disabled:bg-stone-100 flex flex-row justify-center items-center gap-2"
            type="button"
            disabled={loading}
            onClick={loginWithGoogle}
          >
            <GoogleIcon />
            Login with Google
          </button>
        </div>
        <p className="text-stone-400">
          Don't have an account?{" "}
          <Link href="/signup" className="underline text-stone-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
