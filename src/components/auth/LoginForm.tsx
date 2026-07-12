"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md bg-card border border-border shadow-sm rounded-xl p-8 sm:p-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-foreground" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-xl bg-transparent border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground" htmlFor="password">
              Password
            </label>
            <Link href="#" className="text-xs text-primary hover:underline font-medium">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-12 rounded-xl bg-transparent border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-xl font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 mt-2"
        >
          Sign In
        </button>
      </form>

      <div className="my-8 flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Or continue with</span>
      </div>

      <div>
        <button className="flex items-center justify-center gap-2 w-full bg-background border border-border hover:bg-accent text-foreground py-3 rounded-xl font-medium transition-colors text-sm">
          <FaGoogle className="w-4 h-4 text-red-500" />
          Google
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary font-semibold hover:underline">
          Create account
        </Link>
      </p>
    </div>
  );
}
