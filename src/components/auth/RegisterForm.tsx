"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/zod/auth.zod.Schema";
import { authService } from "@/axios/axios.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await authService.register(data);
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center font-sans overflow-hidden">
      {/* Registration Card */}
      <div className="relative w-full max-w-sm p-6 space-y-6 bg-card rounded-lg border border-border shadow-lg">
        {/* Header section */}
        <div className="text-center space-y-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your details to sign up
            </p>
          </div>
        </div>

        {/* Social login buttons */}
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

        {/* OR Divider */}
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

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="Your full name"
              className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.name && (
              <p className="text-xs font-medium text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

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
              className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.email && (
              <p className="text-xs font-medium text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
            >
              Phone Number{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              placeholder="01700000000"
              className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.phone && (
              <p className="text-xs font-medium text-destructive mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
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
                  placeholder="••••••••"
                  className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-5 pr-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
              >
                Confirm
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  placeholder="••••••••"
                  className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-5 pr-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 w-full mt-2"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer links */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
