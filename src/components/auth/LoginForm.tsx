"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/zod/auth.zod.Schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuthStore } from "@/store/auth.store";

// --- Main App Component ---
export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    clearError();
    try {
      await login(data.email, data.password);
      toast.success("Logged in successfully!");
      const hasStore = !!localStorage.getItem("activeStoreId");
      if (hasStore) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    } catch (err: any) {
      toast.error(
        err.message || "Login failed. Please check your credentials.",
      );
    }
  };

  return (
    // Main container with a custom background pattern and flexbox for centering. This setup is inherently responsive.
    <div className="relative w-full flex items-center justify-center font-sans overflow-hidden">
      {/* Login Card - More compact and shadcn-like */}
      <div className="relative w-full max-w-sm p-6 space-y-6 bg-card rounded-lg border border-border shadow-lg">
        {/* Header section with icon and title - More compact */}
        <div className="text-center space-y-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your credentials to sign in
            </p>
          </div>
        </div>

        {/* Social login buttons - More compact shadcn style */}
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              icon: (
                <FaApple className="h-5 w-5 text-foreground dark:text-white" />
              ),
            },
            { icon: <FcGoogle className="h-5 w-5" /> },
            {
              icon: (
                <FaXTwitter className="h-4 w-4 text-foreground dark:text-white" />
              ),
            },
          ].map((item, index) => (
            <button
              key={index}
              className="flex items-center justify-center h-9 px-3 rounded-md border border-border bg-card hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer"
            >
              {item.icon}
            </button>
          ))}
        </div>

        {/* OR Divider - More subtle */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Form - Shadcn style */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="name@example.com"
              className="flex h-12 w-full rounded-lg border border-border bg-background/50 px-4 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:bg-background"
            />
            {errors.email && (
              <p className="text-xs font-medium text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                placeholder="Enter your password"
                className="flex h-12 w-full rounded-lg border border-border bg-background/50 px-4 pr-10 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:bg-background"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs font-medium text-destructive mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-md hover:bg-primary/90 h-12 px-8 w-full mt-4 active:scale-[0.98]"
          >
            {isSubmitting || isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer links - More compact */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Sign up
            </Link>
          </p>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
