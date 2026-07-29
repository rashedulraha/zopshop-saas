"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email
    setIsSubmitted(true);
  };

  return (
    <div className="relative w-full flex items-center justify-center font-sans overflow-hidden">
      {/* Forgot Password Card */}
      <div className="relative w-full max-w-sm p-6 space-y-6 bg-card rounded-lg border border-border shadow-lg">
        {/* Header section */}
        <div className="text-center space-y-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Reset Password
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="bg-primary/10 border border-primary/20 rounded-md p-4 text-center space-y-3">
            <p className="text-sm font-medium text-foreground">
              Check your email
            </p>
            <p className="text-sm text-muted-foreground">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 w-full mt-2"
            >
              Send Reset Link
            </button>
          </form>
        )}

        {/* Footer links */}
        <div className="text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
