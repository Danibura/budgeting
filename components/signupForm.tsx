"use client";

import type { SignupForm } from "@/lib/validation";
import { SignupSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleIcon from "./googleIcon";
import Link from "next/link";

export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignupForm>({
    defaultValues: { email: "", name: "", password: "" },
    resolver: zodResolver(SignupSchema),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function signupWithEmail() {
    try {
      setLoading(true);
      setError("");
      const response = await authClient.signUp.email(getValues());

      if (response.error) {
        setError(response.error.message ?? "");
        return;
      }

      router.push("/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function signupWithGoogle() {
    try {
      setLoading(true);
      setError("");
      const response = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
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
        onSubmit={handleSubmit(signupWithEmail)}
      >
        <h1 className="font-bold text-stone-800 text-xl">Create an account</h1>
        <div className="flex flex-col gap-1 w-full ">
          <h2 className="text-stone-800 font-bold text-sm">Name</h2>
          <input
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className=" shadow-sm shadow-stone-500/30 rounded-lg p-2 text-stone-800 text-sm w-full max-w-xl"
            required
          />
          {errors.name && (
            <h2 className="text-sm text-red-500">{errors.name.message}</h2>
          )}
        </div>
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
            placeholder="Create a strong password"
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
            Create account
          </button>
          <button
            className="bg-white text-stone-800 border border-stone-800 p-2 rounded-lg w-full disabled:bg-stone-100 flex flex-row justify-center items-center gap-2"
            type="button"
            disabled={loading}
            onClick={signupWithGoogle}
          >
            <GoogleIcon />
            Sign up with Google
          </button>
        </div>
        <p className="text-stone-400">
          Already have an account?{" "}
          <Link href="/login" className="underline text-stone-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
